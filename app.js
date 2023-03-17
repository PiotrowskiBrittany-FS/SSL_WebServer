"use strict";
let fs = require("fs");
let http = require("http");
let path = require("path");
let url = require("url");
let express = require("express");
let request = require("request");
let bodyParser = require("body-parser");
let ejs = require("ejs");

const router = express.Router();
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);

router.get("/", function(req,res){
    
    res.render("index", {pagename:"Home"});

})

router.get("/about", function(req,res){

    res.render("about", {pagename:"About"});
    
})

router.post("/login",function(req,res){
    console.log(req.body);
    res.redirect("/");
})


app.use(express.static("public"))
app.use("/", router);
var server = app.listen("8080");

