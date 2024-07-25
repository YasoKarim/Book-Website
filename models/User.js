const mongoose = require("mongoose");
const Joi = require("joi");
const { type } = require("express/lib/response");

//User Schema
const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        minlength:5,
        maxlength:250,
        unique: true,
    },
    username:{
        type: String,
        required: true,
        trim: true,
        minlength:2,
        maxlength:250,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength:6,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
},{timestamps:true});

// Generate Token
UserSchema.methods.generateToken = function(){
    const token = jwt.sign({id : this._id,isAdmin: this.isAdmin},process.env.JWT_SECRET_KEY); 
    return token;
}
// User Model
const User = mongoose.model("User", UserSchema);

// Validate register User


// Validate Create book
function validateRegisterUser(obj){
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(250).required().email(),
        username:Joi.string().trim().min(2).max(250).required(),
        password:Joi.string().trim().min(6).required(),
    });
    return schema.validate(obj);
}

//validate login User
function validateLoginUser(obj){
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(250).required().email(),
        password: Joi.string().trim().min(6).required(),
    });
    return schema.validate(obj);
}

// Validate Logim book
function validateUpdateUser(obj){
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(250).email(),
        username:Joi.string().trim().min(2).max(250),
        password:Joi.string().trim().min(6),
    });
    return schema.validate(obj);
}
module.exports = {
    User,
    validateRegisterUser,
    validateUpdateUser,
    validateLoginUser
}