const express= require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const { getAllAuthors,getAuthorById,createNewUser,updateAuthor,deleteAuthor } = require("../controllers/authorsController");


//hayakhod kol el authors fel database w yhotoha fel database w yb3tha json file
router.get("/", getAllAuthors);
// haydkhol ydawar 3ala el ketab fel array if found send the response
router.get("/:id", getAuthorById);

router.post("/",verifyTokenAndAdmin, createNewUser);

router.put("/:id", verifyTokenAndAdmin,updateAuthor);

router.delete("/:id",verifyTokenAndAdmin,deleteAuthor);

module.exports = router;

/*     const author = authors.find(b => b.id === parseInt(req.params.id));
    if(author){
        res.status(200).json({message:" author has been updated "});
    } else{
        res.status(404).json({message: "author not found"});
    } */
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