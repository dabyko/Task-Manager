//PrismaPg is an adapter that allows Prisma Client to work with PostgreSQL via the pg driver.
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("@prisma/client");

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({
    adapter
});

async function testConnection() {
    try {
        await prisma.$connect();
        console.log("Successfully connected to PostgreSQL!");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

testConnection();

module.exports = prisma;