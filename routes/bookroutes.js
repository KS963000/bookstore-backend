const router = require("express").Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post("/book", async (req, res) => {
    try {
        const data = req.body;
        const newBook = await prisma.book.create({
            data: data
        });
        res.status(200).json({ message: "Book added successfully", newBook });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occurred while adding the book" });
    }
});

router.get("/books", async (req, res) => {
    try {
        const books = await prisma.book.findMany();
        res.status(200).json({ books });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while retrieving the books" });
    }
});

router.get("/book/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const book = await prisma.book.findUnique({
            where: { id: id }
        });
        res.status(200).json({ book });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while retrieving the book" });
    }
});

router.put("/book/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const updatedBook = await prisma.book.update({
            where: { id: id },
            data: data
        });
        res.status(200).json({ message: "Book updated successfully", updatedBook });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while updating the book" });
    }
});

router.delete("/book/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await prisma.book.delete({
            where: { id: id }
        });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while deleting the book" });
    }
});

module.exports = router;
