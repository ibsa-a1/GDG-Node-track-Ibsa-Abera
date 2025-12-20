const Joi = require("joi");
const bookSchema = require("../utils/validationSchema");

let books = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho", price: 12.99 },
    { id: 2, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 15.5 },
];

let lastId = books.length;

exports.getAllBooks = (req, res) => {
    res.status(200).json(books);
};

exports.getBookSearch = (req, res) => {
    res.status(200).json({ message: "You are on the search page" })
}
exports.getBookById = (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((b) => b.id === id);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
};

exports.createBook = (req, res) => {
    const { error } = bookSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const { title, author, price } = req.body;

    const newBook = {
        id: ++lastId,
        title,
        author,
        price,
    };
    books.push(newBook);

    res.status(201).json(newBook);
};

exports.deleteBook = (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((b) => b.id === id);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    books = books.filter((b) => b.id !== id);
    res.status(200).json({ message: "Book deleted" });
}
