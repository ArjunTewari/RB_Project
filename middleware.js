const Product = require("./models/Product");
const { productSchema } = require("./schema");
const { reviewSchema } = require("./schema");
// const { categorySchema } = require("./schema");


let validateProduct = (req, res, next)=>{
    let {name, img, price, category, desc} = req.body;
  const {error} = productSchema.validate({name, img, price, category, desc})
  if(error){
    let msg = error.details.map((err)=> err.message).join(',')
   return res.render('error', {err:msg})
  }
  next();
}

let validateReview = (req, res, next)=>{
    const {rating, comment} = req.body;
    const {error} = reviewSchema.validate({rating, comment})
    if(error){
        const msg = error.details.map((err)=> err.message).join(',');
       return res.render('error', {err:msg})
      }
      next();
}

// let validateCategory = (req, res, next)=>{
//     let {brandName} = req.body;
//     const {error} = categorySchema.validate({brandName})
//     if(error){
//         let msg = error.details.map((err)=> err.message).join(',')
//        return res.render('error', {err:msg})
//       }
//       next();
// }

// middleware to check person is login or not
const isLoggedIn = (req,res,next)=>{

  if(req.xhr && !req.isAuthenticated()){
    
     return res.status(401).send('unauthorised');
  }
  

  if(!req.isAuthenticated()){
      req.flash('error' , 'you need to login first')
      return res.redirect('/login');
  }
  next();
}

// middleware to check the role
const isSeller = (req,res,next)=>{
  if(!req.user.role){ //kisi user ke paas role hi nhi hai
      req.flash('error' , 'you donot have the permission' )
      return res.redirect('/products')
  }
  else if(req.user.role !== 'seller'){
      req.flash('error' , 'you donot have the permission' )
      return res.redirect('/products')
  }
  next();
}


const isAuthor = async(req,res,next)=>{
  let {id} = req.params;
  let product = await Product.findById(id);
  // console.log(product);
  if(!product.author.equals(req.user._id)){
      req.flash('error' , 'you donot have the permission' )
      return res.redirect(`/products/${id}`)
  }
  next();
}


module.exports = {validateProduct , validateReview, isLoggedIn, isSeller,isAuthor};