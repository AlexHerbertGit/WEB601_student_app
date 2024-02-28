// Requires

const http = requires("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

//Init express application
const app = express();

//Define Entries as global array or storage
const entries = [];
app.locals.entries = entries;

// Set the current directory to be views
app.set("views", path.resolve(__dirname, "views"));

//Define the render as ejs
app.set("view engine", "ejs")

//Body Parser to automatically set the HTML header type. 
//Arguments ignore encoding the url extension.

app.use(bodyParser.urlencoded({extended: false}))

//Render the index ejs file.
app.get("/", (req,res) => {
    res.render("index")
})

//If url is /new-entry 
app.get("/new-entry", (req, res) => {
    res.render("new-entry")
})