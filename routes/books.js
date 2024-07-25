const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Joi = require('joi');
const {validateCreateBook,validateUpdateBook, Book} = require("../models/Book");
const { Author } = require("../models/Author");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

/**
 * @desc Get all books
 * @route /api/books
 * @method GET
 * @access public 
 */
router.get("/", asyncHandler(
    async (req,res) => {
    const books = await Book.find().populate("author",["_id","firstName","lastName"]);
    res.status(200).json(books);    
    }
));

/**
 * @desc Get book by id
 * @route /api/books/:id
 * @method GET
 * @access public 
 * 
 */
// haydkhol ydawar 3ala el ketab fel array if found send the response
router.get("/:id",asyncHandler (
    async(req, res)=>{
    //const book = books.find(b => b.id === parseInt(req.params.id));
    const book = await Book.findById(req.params.id);
    if(book){
        res.status(200).json(book);
    } else{
        res.status(404).json({message: "book not found" });
    }
}
));

/**
 * @desc Create new book
 * @route /api/books
 * @method POST
 * @access private (only admin)
 * 
 */
router.post("/",verifyTokenAndAdmin,asyncHandler( async(req,res) =>{
    
    const {error} =   validateCreateBook(req.body);
    if (error){
        return res.status(400).json({message: error.details[0].message});
    }

    console.log(req.body);
    
    const book = new Book (
        {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            cover: req.body.cover,
        }
    )
    //books.push(book);
    const result = await book.save();
    res.status(201).json(result); // 201 => created successfully 
    }
));
/**
 * @desc Update a book
 * @route /api/books:id
 * @method PUT
 * @access private (only admin) 
 * 
 */

router.put("/:id",verifyTokenAndAdmin,asyncHandler(
    async(req,res) => {

    const {error} = validateUpdateBook(req.body);
    if (error){
        return res.status(400).json({message: error.details[0].message});
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id,{
        $set: {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            cover: req.body.cover,
        }
    }, {new:true});
    /*const book = books.find(b => b.id === parseInt(req.params.id));
    if(book){
        res.status(200).json({message:" book has been updated "});
    } else{
        res.status(404).json({message: "book not found"});
    }*/
    res.status(200).json(updatedBook);
}
));

/**
 * @desc Delete a book
 * @route /api/books:id
 * @method Delete
 * @access private (only admin)
 */

router.delete("/:id",verifyTokenAndAdmin,asyncHandler(async(req,res) => {
    //const book = books.find(b => b.id === parseInt(req.params.id));
    const book = await Book.findById(req.params.id);
    if(book){
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({message:" book has been deleted "});
    } else{
        res.status(404).json({message: "book not found"});
    }
}
));



module.exports = router;