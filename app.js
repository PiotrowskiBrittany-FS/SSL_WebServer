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

router.get("/profile", function(req,res){
    res.render("profile", {pagename:"Profile"})
})

router.post("/login", function(req, res) {
    console.log(req.body.email);
    console.log(req.body.password);
    var errors = [];
    if (req.body.email == "") {
        errors.push("Email is required")
    }
    if (req.body.password == "") {
        errors.push("Password is required")
    }
    if (req.body.email !== "mike@aol.com") {
        errors.push("Invalid email")
    }
    if (req.body.password !== "abc123") {
        errors.push("Invalid password");
    }
    if (errors.length > 0) {
        res.render("login", { errors: errors });
    } else {
        res.redirect("/profile");
    }
})


// router.get("/register", function(req, res) {
//     res.render("register");
//   });
  
//   router.post("/register", function(req, res) {
//     var errors = [];
//     var { name, email, password, confirm_password } = req.body;
  
//     if (!name) {
//       errors.push("Name is required");
//     }
    
//     if (!email) {
//       errors.push("Email is required");
//     } else if (email !== "mike@aol.com") {
//       errors.push("Invalid email");
//     }
  
//     if (!password) {
//       errors.push("Password is required");
//     } else if (password !== "abc123") {
//       errors.push("Invalid password");
//     }
  
//     if (errors.length === 0) {
//       // Save user data to database
//       res.redirect("/profile");
//     } else {
//       res.render("register", { errors: errors });
//     }
//   });
  



app.use(express.static("public"))
app.use("/", router);
var server = app.listen("8080");

