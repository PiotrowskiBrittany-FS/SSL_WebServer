"use strict";
let fs = require("fs");
let http = require("http");
let path = require("path");
let url = require("url");
let express = require("express");
let request = require("request");
let bodyParser = require("body-parser");
let ejs = require("ejs");
let app = express();
const { check, validationResult } = require('express-validator');


const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);

const session = require("express-session");
app.use(session({secret:"secret",resave:false,saveUnitialized:false}));
var sess;

app.get('/css/styles.css', (req, res) => {
    res.set('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, '/css/styles.css'));
});
app.get('/js/scripts.js', function(req, res) {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/js/scripts.js');
});
  

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
        const emailValidation = check('firstName')
        .not()
        .isEmpty()
        .withMessage('Email is Required')
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
    if (req.body.email === 'mike@aol.com' && req.body.password === 'abc123') {
        sess = req.session;
        sess.loggedin = true;
        res.render('profile',{pagename:'Profile',sess:sess});
    } else {
        sess = req.session;
        sess.loggedin = false;
        res.render('index',{pagename:'Home',error:errors});
    }

    app.post('/login', [
        emailValidation,
        
        ], (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Render the form again with error messages
            return res.render('form', {
                errors: errors.array(),
                formData: req.body
            });
        }
    
        // If no errors, process the form data and redirect
        // to a success page
        // ...
        });
    
});


router.get('/contact',function(req,res){
    sess=req.session;
    res.render('contact', {pagename: "Contact",sess:sess})


    // Define validation rules for each field
    const firstNameValidation = check('firstName')
    .not()
    .isEmpty()
    .withMessage('First name is required')
    .isAlpha()
    .withMessage('First name must only contain letters');

    const lastNameValidation = check('lastName')
    .not()
    .isEmpty()
    .withMessage('Last name is required')
    .isAlpha()
    .withMessage('Last name must only contain letters');

    const addressValidation = check('address')
    .not()
    .isEmpty()
    .withMessage('Address is required');

    const cityValidation = check('city')
    .not()
    .isEmpty()
    .withMessage('City is required');

    const stateValidation = check('state')
    .not()
    .isEmpty()
    .withMessage('State is required');

    const zipValidation = check('zip')
    .not()
    .isEmpty()
    .withMessage('Zip code is required')
    .isPostalCode('US')
    .withMessage('Zip code must be a valid US zip code');

    const ageValidation = check('age')
    .not()
    .isEmpty()
    .withMessage('Age is required');

    const genderValidation = check('gender')
    .not()
    .isEmpty()
    .withMessage('Gender is required');

    const consentValidation = check('consent')
    .not()
    .isEmpty()
    .withMessage('Consent is required')
    .equals('on')
    .withMessage('You must consent to continue');

    const bioValidation = check('bio')
    .not()
    .isEmpty()
    .withMessage('Bio is required');

    // Define the route for the form submission
    app.post('/submit-form', [
    firstNameValidation,
    lastNameValidation,
    addressValidation,
    cityValidation,
    stateValidation,
    zipValidation,
    ageValidation,
    genderValidation,
    consentValidation,
    bioValidation
    ], (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Render the form again with error messages
        return res.render('form', {
            errors: errors.array(),
            formData: req.body
        });
    }

    // If no errors, process the form data and redirect
    // to a success page
    // ...
    });

    // Define the route to render the form
    app.get('/form', (req, res) => {
    res.render('form');
});

})






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