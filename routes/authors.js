const express= require("express");
const router = express.Router();
const Joi = require('joi');
const {Author} = require("../models/Author");

const authors = [
    {
    id: 1,
    firstName: "Yasmine",
    lastName: "Karim",
    nationality: "Egyptian",
    image: "default-image.png",
    },
]
/**
 * @desc Get all books
 * @route /api/books
 * @method GET
 * @access public 
 * 
 */
router.get("/", (req,res) => {
    res.status(200).json(authors);

});

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method GET
 * @access public 
 * 
 */
// haydkhol ydawar 3ala el ketab fel array if found send the response
router.get("/:id",(req, res)=>{
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if(author){
        res.status(200).json(author);
    } else{
        res.status(404).json({message: "Author not found" });
    }
});

/**
 * @desc Create new authors
 * @route /api/authors
 * @method POST
 * @access public 
 * 
 */
router.post("/",async (req,res) =>{

    const {error} = validateCreateAuthor(req.body);
    if (error){
        return res.status(400).json({message: error.details[0].message});
    }
    console.log(req.body);
    try {
        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image,
        
        });
        const result = await author.save();
        //authors.push(author);
        res.status(201).json(author); // 201 => created successfully 
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
});
/**
 * @desc Update a author
 * @route /api/authors:id
 * @method PUT
 * @access public 
 * 
 */

router.put("/:id",(req,res) => {
    const {error} = validateUpdateAuthor(req.body);
    if (error){
        return res.status(400).json({message: error.details[0].message});
    }
    const author = authors.find(b => b.id === parseInt(req.params.id));
    if(author){
        res.status(200).json({message:" author has been updated "});
    } else{
        res.status(404).json({message: "author not found"});
    }
});

/**
 * @desc Delete an author
 * @route /api/authors:id
 * @method Delete
 * @access public 
 * 
 */

router.delete("/:id",(req,res) => {
    const {error} = validateUpdateAuthor(req.body);
    if (error){
        return res.status(400).json({message: error.details[0].message});
    }
    const author = authors.find(b => b.id === parseInt(req.params.id));
    if(author){
        res.status(200).json({message:" book has been deleted "});
    } else{
        res.status(404).json({message: "book not found"});
    }
});
// Validate Create book
function validateCreateAuthor(obj){
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(200).required(),
        lastName: Joi.string().trim().min(3).max(200).required(),
        nationality: Joi.string().trim().min(3).max(200).required(),
        image: Joi.string(),
    });
    return schema.validate(obj);
}


// Validate Update book
function validateUpdateAuthor (obj){
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(200),
        lastName: Joi.string().trim().min(3).max(200),
        nationality: Joi.string().trim().min(3).max(200),
        image: Joi.string(),
    });
    return schema.validate(obj);
}
module.exports = router;