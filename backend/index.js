'use strict';

const express = require('express');
const prisma  = require('./src/prisma.js');  // your instantiated client

const app = express();
app.use(express.json());

// health check — confirms Prisma and DB are alive
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Montra API running on port ${PORT}`));