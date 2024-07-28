const asyncHandler = require("express-async-handler");
const {Author,validateCreateAuthor,validateUpdateAuthor} = require("../models/Author");

/**
 * @desc Get all authors
 * @route /api/authors
 * @method GET
 * @access public 
 */
const getAllAuthors = asyncHandler(
    async(req,res) => {
    const { pageNumber } = req.query;
    const authorsPerPage = 2;
    // Take all authors in database and save it in th list
    const authorList = await Author.find()
                                    .skip((pageNumber - 1) * authorsPerPage)
                                    .limit(2);
    res.status(200).json(authorList);
    }
)

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method GET
 * @access public 
 */
const getAuthorById = asyncHandler(
    async (req, res)=>{
    //const author = authors.find(a => a.id === parseInt(req.params.id));
    
        const author = await Author.findById(req.params.id);
        if(author){
            res.status(200).json(author);
        } else{
            res.status(404).json({message: "Author not found" });
        }
    }
)

/**
 * @desc Create new authors
 * @route /api/authors
 * @method POST
 * @access private (only admin)
 */
const createNewUser = asyncHandler(async (req,res) =>{

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
})

/**
 * @desc Update a author
 * @route /api/authors:id
 * @method PUT
 * @access private (only admin)  
 */
const updateAuthor = asyncHandler(async (req,res) => {
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
    

})

/**
 * @desc Delete an author
 * @route /api/authors:id
 * @method Delete
 * @access private (only admin)  
 */
const deleteAuthor = asyncHandler(async (req,res) => {
    const author = await Author.findById(req.params.id);
if(author){
    await Author.findByIdAndDelete(req.params.id);
    res.status(200).json({ message:"Author has been deleted" });
}
else{
    res.status(404).json({ message:"Author not found" });
}
})


module.exports = {
    getAllAuthors,
    getAuthorById,
    createNewUser,
    updateAuthor,
    deleteAuthor
};