// require express
const express =  require('express');
const User = require('../models/User');
const router = express.Router();
const passport = require('passport');

// signup route
router.get('/register',(req,res)=>{
    res.render('auth/signup')
})

// actually want to register a user in my db
router.post('/register' , async(req,res)=>{
    // console.log(req.body,'sam')
    try{
      let {username , email , age , password , role} = req.body;
      let user = new User({username , email , age , role});
      let newUser = await User.register(user , password); //static method
      // res.send(newUser);
      // res.redirect('/login');
      // direct signup krke products page par jana hai.
      req.login(newUser, function(err){
        if(err){
          return next(err);
        }
        req.flash('success', 'welcome, your are register successfully');
        return res.redirect('/products');
      })
    }
    catch(e){
      req.flash('error', e.message);
     return res.redirect('/signup');
  } 
  })

// to get login form
router.get('/login' , (req,res)=>{
    res.render('auth/login')
})

// to acutally login via the db
router.post('/login',
  passport.authenticate('local', 
  { 
    failureRedirect: '/login', 
    failureMessage: true 
  }),
  function(req, res) {
    // console.log(req.user);
    req.flash('success' , `welcome back ${req.user.username}`)
    res.redirect('/products');
});  

// logout from package
router.get('/logout', (req, res)=>{
  req.logout(function(err) {
    if (err) { 
      req.flash('error' , 'try again')
  }
  req.flash('success' , 'sucessfully logged out')
    res.redirect('/login');
  });
});




module.exports = router;