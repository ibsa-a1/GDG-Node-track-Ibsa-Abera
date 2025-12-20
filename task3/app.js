const express = require("express");
const morgan = require("morgan");
const booksRoute = require("./src/routes/bookRoutes");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/books", booksRoute);

app.use(errorHandler);

module.exports = app;