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
app.get("/", (req,res, next) => {
    res.render("index")
})

//Renders the new-entry ejs file
app.get("/new-entry", (req, res) => {
    if(req.url === "/") {
        res.render("new-entry")
    } else if (req.url === "/throw") {
        throw new Error("Wrong Path!")
    } else {
        next("You didn't visit the right home page")
    }
});

//if url is host:port/new-entry 
app.post("/new-entry", (req, res) => {
    //if request body has no title or body tag
    if(!req.body.title || !req.body.body) {
        //respond 400 bad req and send plain text message
        res.status(400).send("Entries must have a title and an information body. PLease provide that!")
        //Exit handler
        return
    }
    //Push new entry to entries variable.
entries.push({
    title: req.body.title,
    body: req.body.body,
    published: new Date()
})
res.redirect("/")
})

app.use((req,res) => {
    //return 404!
    res.status(400).render("404")
})

//Create a server on port:3000 

http.createServer(app).listen(3000, () => {
    console.log("Running on port 3000")
})