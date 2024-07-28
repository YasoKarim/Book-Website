const express = require("express");
const router = express.Router();
const Joi = require('joi');
const { Author } = require("../models/Author");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const { getAllBooks, getBookById ,createBook, updateBook, deleteBook} = require("../controllers/bookController")

//Route Chaining

//api/books
router.route("/")
    .get(getAllBooks)
    .post(verifyTokenAndAdmin,createBook);

//api/books/:id
router.route("/:id")
    .get(getBookById)
    .put(verifyTokenAndAdmin,updateBook)
    .delete(verifyTokenAndAdmin,deleteBook);

module.exports = router;

//router.get("/",getAllBooks);
// haydkhol ydawar 3ala el ketab fel array if found send the response
//router.get("/:id",getBookById);
//router.post("/",verifyTokenAndAdmin,createBook);
//router.put("/:id",verifyTokenAndAdmin,updateBook);
//router.delete("/:id",verifyTokenAndAdmin,deleteBook);
