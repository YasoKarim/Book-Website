const express= require("express");
const router = express.Router();
const { mkcol } = require("../routes/authors");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const { updateUser, getAllUsers, getUserById, deleteUser } = require("../controllers/usersController");

router.put("/:id",verifyTokenAndAuthorization,updateUser);

router.get("/",verifyTokenAndAdmin,getAllUsers);

router.get("/:id",verifyTokenAndAuthorization,getUserById);

router.delete("/:id",verifyTokenAndAuthorization,deleteUser);

module.exports = router;