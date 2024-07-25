const mongoose = require("mongoose");

// new Database Connection
async function connectToDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB...");
    } catch(error){ 
        console.log("Connection Failed to MongoDB!",error);
    }
}

module.exports = connectToDB;

// OLD DATABASE CONNECTION
/*//Connection To Database
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB..."))
.catch((error) => console.log("Connection Failed to MongoDB!",error));
*/