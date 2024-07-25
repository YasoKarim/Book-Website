const express= require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {Author,validateCreateAuthor,validateUpdateAuthor} = require("../models/Author");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
/**
 * @desc Get all authors
 * @route /api/authors
 * @method GET
 * @access public 
 * 
 */
//hayakhod kol el authors fel database w yhotoha fel database w yb3tha json file
router.get("/", asyncHandler(
    async(req,res) => {
    // Take all authors in database and save it in th list
    const authorList = await Author.find();
    res.status(200).json(authorList);
    }
));

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method GET
 * @access public 
 * 
 */
// haydkhol ydawar 3ala el ketab fel array if found send the response
router.get("/:id", asyncHandler(
    async (req, res)=>{
    //const author = authors.find(a => a.id === parseInt(req.params.id));
    
        const author = await Author.findById(req.params.id);
        if(author){
            res.status(200).json(author);
        } else{
            res.status(404).json({message: "Author not found" });
        }
    }
));

/**
 * @desc Create new authors
 * @route /api/authors
 * @method POST
 * @access private (only admin)
 * 
 */
router.post("/",verifyTokenAndAdmin, asyncHandler(async (req,res) =>{

    const {error} = validateCreateAuthor(req.body);
    if (error){
        return res.status(400).json({message: error.details[0].message});
    }
    console.log(req.body);
        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image,
        
        });
        const result = await author.save();
        //authors.push(author);
        res.status(201).json(author); // 201 => created successfully 
}));

/**
 * @desc Update a author
 * @route /api/authors:id
 * @method PUT
 * @access private (only admin)  
 * 
 */

router.put("/:id", verifyTokenAndAdmin,asyncHandler(async (req,res) => {
    // check if it's valid and then update
    const {error} = validateUpdateAuthor(req.body);
    
    if (error){
        return res.status(400).json({message: error.details[0].message});
    }
    const author = await Author.findByIdAndUpdate(
        req.params.id, 
        {
            $set:{
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                nationality:req.body.nationality,
                image: req.body.image,
            },
        }, 
        {new: true}
    );
    res.status(200).json(author);
    

}));
/*     const author = authors.find(b => b.id === parseInt(req.params.id));
    if(author){
        res.status(200).json({message:" author has been updated "});
    } else{
        res.status(404).json({message: "author not found"});
    } */
/**
 * @desc Delete an author
 * @route /api/authors:id
 * @method Delete
 * @access private (only admin)  
 */

router.delete("/:id",verifyTokenAndAdmin,asyncHandler(async (req,res) => {
            const author = await Author.findById(req.params.id);
        if(author){
            await Author.findByIdAndDelete(req.params.id);
            res.status(200).json({ message:"Author has been deleted" });
        }
        else{
            res.status(404).json({ message:"Author not found" });
        }
    } 
));
/*
    const {error} = validateUpdateAuthor(req.body);
    if (error){
        return res.status(400).json({message: error.details[0].message});
    }
    const author = authors.find(b => b.id === parseInt(req.params.id));
    if(author){
        res.status(200).json({message:" book has been deleted "});
    } else{
        res.status(404).json({message: "book not found"});
    }*/
module.exports = router;