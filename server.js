/*
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // For parsing application/json

// Example endpoint: GET /api/hello
app.get('/api/hello', (req, rs) => {
    res.json({ message: 'Hello, world!' });
});

// Example endpoint: POST /api/echo
app.post('/api/echo', (req, res) => {
    res.json({ received: req.body });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
*/


const http = require("http");
const express = require("express");
const booksPath= require("./routes/books");
const authorsPath= require("./routes/authors");
const mongoose = require("mongoose");
const { error } = require("console");
const dotenv = require("dotenv");

dotenv.config();
//Connection To Database
mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Connected to MongoDB..."))
        .catch((error) => console.log("Connection Failed to MongoDB!",error));


//const { title } = require("process");


const app = express();
// Apply middleware
app.use(express.json());

// dah haykon feh route l kol paths
app.use("/api/books",booksPath);
app.use("/api/authors",authorsPath);

app.get("/",(req,res) =>{
    res.send("Welcome Yasmine");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));


/*
//app.post();
//app.put();
//app.delete();

const server = http.createServer((req, res) =>{
    if(req.url == "/"){
        res.write("<h1>Welcome to Node JS </h1>");
        res.end();
    }
    if(req.url == "/api/books"){
        res.write(JSON.stringify(books));
        res.end();

    }

});

//const logger = require("./logger");
// 3ashan a import el haga
//const {log} = require("./logger");

//log();
*/
