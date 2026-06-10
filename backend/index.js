'use strict';

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma  = require('./src/prisma.js');  // instantiated client
const { sendVerificationEmail, sendPasswordResetEmail } = require('./utils/mailer.js');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  })
);

// health check — confirms Prisma and DB are alive
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// POST /auth/signup
app.post('/auth/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    if (!normalizedEmail || String(password).length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters.' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true },
    });

    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(String(password), 12);

    // Create user (unverified)
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        role: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    // Generate a verification token (24h expiry)
    const token = jwt.sign(
      { userId: user.id, email: normalizedEmail },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Store token in email_verifications table
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await prisma.emailVerification.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    // Send verification email
    await sendVerificationEmail(normalizedEmail, token);

    return res.status(201).json({
      message: 'Account created! Please check your email to verify your account.',
      user,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Unable to create account.' });
  }
});

// ── POST /auth/login ─────────────────────────
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: {
        id: true,
        email: true,
        passwordHash: true,
        emailVerified: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    if (!user.emailVerified) {
      return res.status(403).json({ message: 'Please verify your email before logging in.' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(String(password), user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const authToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return res.json({
      message: 'Login successful',
      token: authToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Login failed.' });
  }
});

// ── GET /auth/verify-email?token=... ─────────────────────────
app.get('/auth/verify-email', async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: 'Verification token is missing.' });
    }

    // Verify JWT signature and expiry
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(400).json({ message: 'Verification link has expired. Please sign up again.' });
      }
      return res.status(400).json({ message: 'Invalid verification token.' });
    }

    // Find the matching record in email_verifications
    const record = await prisma.emailVerification.findFirst({
      where: {
        token,
        userId: decoded.userId,
      },
    });

    if (!record) {
      return res.status(400).json({ message: 'Invalid or already-used verification link.' });
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Verification link has expired. Please sign up again.' });
    }

    // Mark user as verified and delete the verification record
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { emailVerified: true },
    });

    await prisma.emailVerification.delete({
      where: { id: record.id },
    });

    // Redirect to the frontend login page with a success flag
    return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?verified=true`);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Verification failed.' });
  }
});

// ── POST /auth/resend-verification ───────────────────────────
app.post('/auth/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true, emailVerified: true },
    });

    // Return the same response whether user exists or not (prevents email enumeration)
    if (!user || user.emailVerified) {
      return res.json({ message: 'If that account exists and is unverified, a new link has been sent.' });
    }

    // Delete any existing verification tokens for this user
    await prisma.emailVerification.deleteMany({
      where: { userId: user.id },
    });

    // Create a fresh token
    const token = jwt.sign(
      { userId: user.id, email: normalizedEmail },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await prisma.emailVerification.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    await sendVerificationEmail(normalizedEmail, token);

    return res.status(201).json({ user });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Unable to create account.' });
  }
});

// ── POST /auth/forgot-password ───────────────────────────
app.post('/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true },
    });

    // Return the same response whether user exists or not (prevents email enumeration)
    if (!user) {
      return res.json({ message: 'If that account exists, a password reset link has been sent.' });
    }

    // Delete any existing reset tokens for this user
    await prisma.passwordReset.deleteMany({
      where: { userId: user.id },
    });

    // Create a reset token (1h expiry)
    const token = jwt.sign(
      { userId: user.id, email: normalizedEmail, type: 'password-reset' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    await sendPasswordResetEmail(normalizedEmail, token);

    return res.json({ message: 'If that account exists, a password reset link has been sent.' });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Unable to process password reset request.' });
  }
});

// ── POST /auth/reset-password ───────────────────────────
app.post('/auth/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token and new password are required.' });
    }

    if (String(newPassword).length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters.' });
    }

    // Verify JWT signature and expiry
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(400).json({ message: 'Password reset link has expired. Please request a new one.' });
      }
      return res.status(400).json({ message: 'Invalid password reset token.' });
    }

    // Verify this is a password reset token
    if (decoded.type !== 'password-reset') {
      return res.status(400).json({ message: 'Invalid token type.' });
    }

    // Find the matching reset record
    const record = await prisma.passwordReset.findFirst({
      where: {
        token,
        userId: decoded.userId,
      },
    });

    if (!record) {
      return res.status(400).json({ message: 'Invalid or already-used password reset link.' });
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Password reset link has expired. Please request a new one.' });
    }

    // Hash the new password and update user
    const passwordHash = await bcrypt.hash(String(newPassword), 12);
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { passwordHash },
    });

    // Delete the used reset token
    await prisma.passwordReset.delete({
      where: { id: record.id },
    });

    return res.json({ message: 'Your password has been successfully reset. You can now log in with your new password.' });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Password reset failed.' });
  }
});

// ── Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Montra API running on port ${PORT}`));