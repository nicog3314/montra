'use strict';

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const prisma  = require('./src/prisma.js');  // instantiated client

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

    return res.status(201).json({ user });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Unable to create account.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Montra API running on port ${PORT}`));