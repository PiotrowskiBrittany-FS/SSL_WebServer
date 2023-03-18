"use strict";
let fs = require("fs");
let http = require("http");
let path = require("path");
let url = require("url");
let express = require("express");
let request = require("request");
let bodyParser = require("body-parser");
let ejs = require("ejs");

const session = require('express-session');
let app = express();

const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);

const session = require("express-session");
app.use(session({secret:"secret",saveUnitialized:true,resave:true}));
var sess;

router.get('/',function(req,res){
    sess=req.session;
    res.render('index', {pagename: "Home",sess:sess})
})

router.get("/about", function(req,res){
    sess=req.session;
    res.render("about", {pagename:"About",sess:sess});
});


router.get("/profile", function(req,res){
    sess=req.session;
    if(typeof(sess)=="undefined"||sess.loggedin != true){
        var errors = ["Not an authenticated user"];
        res.render("index",{pagename:"Home",errors:errors})
    } else {
        res.render("profile", {pagename:"Profile",sess:sess});
    }
});

router.get("/logout",function(req,res){
    sess=req.session;
    sess.destroy(function(err){
        res.redirect("/");
    })
})

router.post("/login", function(req, res) {
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
    } 
    if (req.body.email === 'Mike@aol.com' && req.body.password === 'abc123') {
        sess = req.session;
        sess.loggedin = true;
        res.render('profile',{pagename:'Profile',sess:sess});
    } else {
        sess = req.session;
        sess.loggedin = false;
        res.render('index',{pagename:'Home',sess:sess});
    }
});

app.use(express.static("public"));
app.use("/", router);

var server = app.listen("8080");





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