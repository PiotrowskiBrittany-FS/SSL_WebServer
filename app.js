"use strict"

var fs = require("fs");
var http = require("http");
var path = require("path");
var url = require("url");

var express = require("express");
var request = require("request");
var bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


let ejs = require("ejs");
const router = express.Router();
var app = express();
app.set("view engine", "ejs");
app.engine("ejs", require("ejs")._express);

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

