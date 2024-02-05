const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose'); //require mongoose for the connection
const seedDB = require("./seed"); //schema
const productRoute = require("./Routes/product"); //route folder 
const reviewRoute = require("./Routes/review"); //route folder 
const authRoute = require('./Routes/auth');
const cartRoute = require('./Routes/cart');
const productApi = require('./Routes/api/productApi');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');  //p
const LocalStrategy = require('passport-local');  //pl
const User = require('./models/User');

const dotenv = require('dotenv').config();

// atls mongodb
let url = process.env.MONGO_URL
// mongooses connecting to db and creating db.
mongoose.connect(url)
.then(()=>{
    console.log("Db connected")
})
.catch((err)=>{
    console.log("Db not Connected", err)
})


let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
  };




app.engine('ejs', ejsMate); //ejsmate engine ejs ki files ko dekhega 
app.set('view engine', 'ejs'); //its a bydefault in express as engine.
app.set("views", path.join(__dirname, "views")); //views folder path
app.use(express.static(path.join(__dirname,"public"))); //public folder path
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session(configSession));
app.use(flash());

// use pasport ki chije
app.use(passport.initialize()); //p
app.use(passport.session());  //p

// user ko authenticate krne ki strategy
passport.serializeUser(User.serializeUser()); //plm
passport.deserializeUser(User.deserializeUser()); //plm


// seeding databse -> run only one time
// seedDB();

// middleware for flash messages -> locals store object
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// passport
passport.use(new LocalStrategy(User.authenticate())); //plm

// home page
app.get('/' , (req,res)=>{
    res.render('home');
})

// routes middleware
app.use(productRoute); //so that haar incoming request ke liye path check kiya jaaye
app.use(reviewRoute);
app.use(authRoute);
app.use(cartRoute);
app.use(productApi);



app.get('*',(req,res)=>{
    res.render('error',  {err: 'page not found'});
})


app.listen(process.env.PORT, ()=>{
    console.log(`server is connected to :${process.env.PORT}`);
})