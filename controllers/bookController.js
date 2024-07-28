const asyncHandler = require("express-async-handler");
const {validateCreateBook,validateUpdateBook, Book} = require("../models/Book");


/**
 * @desc Get all books
 * @route /api/books
 * @method GET
 * @access public 
 */
const getAllBooks =  asyncHandler(
    async (req,res) => {
    const { minPrice, maxPrice } = req.query;
    // Comparsion Query Operator
    // $eq => equal
    // $ne => not equal
    // $lte => less than or equal
    // $lt => less than
    // $gte => greater than or equal
    // $gt => greater than
    // $in => in
    let books;
    if(minPrice && maxPrice){
    books = await Book.find({price: {$gte: minPrice, $lte: maxPrice}})
    .populate("author",
        ["_id",
        "firstName",
        "lastName"]);
    }
    else{
    books = await Book.find().populate("author",
        ["_id",
        "firstName",
        "lastName"]);
    }
    res.status(200).json(books);    
    })

/**
 * @desc Get book by id
 * @route /api/books/:id
 * @method GET
 * @access public 
 */
const getBookById = asyncHandler (
    async(req, res)=>{
    //const book = books.find(b => b.id === parseInt(req.params.id));
    const book = await Book.findById(req.params.id);
    if(book){
        res.status(200).json(book);
    } else{
        res.status(404).json({message: "book not found" });
    }
})

/**
 * @desc Create new book
 * @route /api/books
 * @method POST
 * @access private (only admin)
 */
const createBook = asyncHandler(async(req,res) =>{
    
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
)

/**
 * @desc Update a book
 * @route /api/books:id
 * @method PUT
 * @access private (only admin) 
 */
const updateBook = asyncHandler(
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
})

/**
 * @desc Delete a book
 * @route /api/books:id
 * @method Delete
 * @access private (only admin)
 */

const deleteBook = asyncHandler(async(req,res) => {
    //const book = books.find(b => b.id === parseInt(req.params.id));
    const book = await Book.findById(req.params.id);
    if(book){
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({message:" book has been deleted "});
    } else{
        res.status(404).json({message: "book not found"});
    }
})
module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}