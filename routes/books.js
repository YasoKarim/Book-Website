const express = require("express");
const router = express.Router();
const Joi = require('joi');


const books = [
    {
        id: 1,
        name: "harry potter"
    },
    {
        id: 2,
        name: "The Summer I turned pretty"
    }

]
/**
 * @desc Get all books
 * @route /api/books
 * @method GET
 * @access public 
 * 
 */
router.get("/", (req,res) => {
    res.status(200).json(books);

});

/**
 * @desc Get book by id
 * @route /api/books/:id
 * @method GET
 * @access public 
 * 
 */
// haydkhol ydawar 3ala el ketab fel array if found send the response
router.get("/:id",(req, res)=>{
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(book){
        res.status(200).json(book);
    } else{
        res.status(404).json({message: "book not found" });
    }
});

/**
 * @desc Create new book
 * @route /api/books
 * @method POST
 * @access public 
 * 
 */
router.post("/",(req,res) =>{
   
    const {error} = validateCreateBook(req.body);
    if (error){
        return res.status(400).json({message: error.details[0].message});
    }
    console.log(req.body);
    const book = {
        id: books.length  + 1,
        title: req.body.title
    }
    books.push(book);
    res.status(201).json(book); // 201 => created successfully 
});
/**
 * @desc Update a book
 * @route /api/books:id
 * @method PUT
 * @access public 
 * 
 */

router.put("/:id",(req,res) => {
    const {error} = validateUpdateBook(req.body);
    if (error){
        return res.status(400).json({message: error.details[0].message});
    }
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(book){
        res.status(200).json({message:" book has been updated "});
    } else{
        res.status(404).json({message: "book not found"});
    }
});

/**
 * @desc Delete a book
 * @route /api/books:id
 * @method Delete
 * @access public 
 * 
 */

router.delete("/:id",(req,res) => {
    const {error} = validateUpdateBook(req.body);
    if (error){
        return res.status(400).json({message: error.details[0].message});
    }
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(book){
        res.status(200).json({message:" book has been deleted "});
    } else{
        res.status(404).json({message: "book not found"});
    }
});
// Validate Create book
function validateCreateBook(obj){
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200).required(),
    });
    return schema.validate(obj);
}


// Validate Update book
function validateUpdateBook(obj){
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200),
    });
    return schema.validate(obj);
}


module.exports = router;