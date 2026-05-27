const { PrismaClient } = require('../src/generated/prisma'); // Points directly to your custom generated package

const prisma = new PrismaClient();

module.exports = prisma;