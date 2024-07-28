const { Book } = require("./models/Book");
const { Author } = require("./models/Author");
const { books,authors } = require("./data");
const connectToDb = require("./config/db");

require("dotenv").config();

connectToDb();

// Import Books (Seeding Database)
const importBooks = async () => {
    try{
        //await Book.deleteMany({});
        await Book.insertMany(books);
        console.log("Data Import Success");
        process.exit();
    } catch(error){
        console.error("Error with data import",error);
        process.exit(1);
    }
}
// Import Books (Seeding Database)
const importAuthors = async () => {
    try{
        //await Book.deleteMany({});
        await Author.insertMany(authors);
        console.log("Data Import Success");
        process.exit();
    } catch(error){
        console.error("Error with data import",error);
        process.exit(1);
    }
}
//Remove Books
const removeBooks = async () => {
    try{
        await Book.deleteMany({});
        //await Book.insertMany(books);
        console.log("Books Removed!");
        process.exit();
    } catch(error){
        console.error("Error with data import",error);
        process.exit(1);
    }
}

if(process.argv[2] === "-import"){
    importBooks();
}
else if(process.argv[2] === "-remove"){
    removeBooks();
}
else if(process.argv[2] === "-import-authors"){
    importAuthors();
}

