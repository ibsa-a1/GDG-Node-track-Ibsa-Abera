const express = require("express");
const router = express.Router();
const booksController = require("../controllers/booksController");

router.get("/", booksController.getAllBooks);
router.get("/search", booksController.getBookSearch);
router.get("/:id", booksController.getBookById);
router.post("/", booksController.createBook);
router.delete("/:id", booksController.deleteBook);


module.exports = router;