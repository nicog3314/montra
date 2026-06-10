const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendVerificationEmail(toEmail, token) {
  if (!process.env.BASE_URL) {
    throw new Error('BASE_URL environment variable is not set');
  }
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }

  const verifyUrl = `${process.env.BASE_URL}/auth/verify-email?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Montra <onboarding@resend.dev>', // free tier default sender
      to: toEmail,
      subject: 'Verify your Montra account',
      html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#36413E;border-radius:16px;">
          <h1 style="color:#ECBEB4;font-weight:300;letter-spacing:0.15em;">Montra.</h1>
          <p style="color:#869D96;margin-top:24px;">Thanks for signing up. Click the button below to verify your email address.</p>
          <a href="${verifyUrl}"
             style="display:inline-block;margin-top:24px;padding:12px 28px;background:#ECBEB4;color:#36413E;
                    border-radius:8px;text-decoration:none;font-weight:600;letter-spacing:0.1em;font-size:0.85rem;">
            Verify Email
          </a>
          <p style="color:#869D96;margin-top:24px;font-size:0.8rem;">
            This link expires in 24 hours. If you didn't sign up for Montra, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error(`Failed to send verification email to ${toEmail}:`, error);
      throw new Error(`Resend error: ${error.message}`);
    }
    console.log(`Verification email sent to ${toEmail}:`, data);
  } catch (err) {
    console.error(`Failed to send verification email to ${toEmail}:`, err);
    throw err;
  }
}

async function sendPasswordResetEmail(toEmail, token) {
  if (!process.env.BASE_URL) {
    throw new Error('BASE_URL environment variable is not set');
  }
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }

  const resetUrl = `${process.env.BASE_URL}/auth/reset-password?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Montra <onboarding@resend.dev>',
      to: toEmail,
      subject: 'Reset your Montra password',
      html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#36413E;border-radius:16px;">
          <h1 style="color:#ECBEB4;font-weight:300;letter-spacing:0.15em;">Montra.</h1>
          <p style="color:#869D96;margin-top:24px;">We received a request to reset your password. Click the button below to set a new password.</p>
          <a href="${resetUrl}"
             style="display:inline-block;margin-top:24px;padding:12px 28px;background:#ECBEB4;color:#36413E;
                    border-radius:8px;text-decoration:none;font-weight:600;letter-spacing:0.1em;font-size:0.85rem;">
            Reset Password
          </a>
          <p style="color:#869D96;margin-top:24px;font-size:0.8rem;">
            This link expires in 1 hour. If you didn't request a password reset, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error(`Failed to send password reset email to ${toEmail}:`, error);
      throw new Error(`Resend error: ${error.message}`);
    }
    console.log(`Password reset email sent to ${toEmail}:`, data);
  } catch (err) {
    console.error(`Failed to send password reset email to ${toEmail}:`, err);
    throw err;
  }
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail };