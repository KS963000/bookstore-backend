const express = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

async function main() {
    await prisma.$connect();
    console.log('Connected to the database.');
}

main().catch(e => {
    console.error('Error connecting to the database', e);
    process.exit(1);
});

app.use(express.json());

const router = require("./routes/bookroutes");
app.use("/api/v1", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

process.on('SIGINT', () => {
    console.log('Shutting down server...');
    prisma.$disconnect().then(() => {
        console.log('Disconnected from the database.');
        process.exit(0);
    });
});
