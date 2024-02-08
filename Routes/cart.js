const express = require("express");
const router = express.Router(); //mini instance of app
const { isLoggedIn , isAuthor} = require('../middleware');
const Product = require("../models/Product");
const User = require("../models/User");
// tested key provided by stripe
const stripe = require('stripe')('sk_test_51OeuVcSBoHuRrqaSlLeXJE7n4xvG7dbDNAepbR8wcVrbXpkfLwurKVGZE3THpwcLdxkIbZWReB6E0QrMS95ErovM00byJmCw4a')


// route to see the cart
router.get('/user/cart',isLoggedIn, async(req,res)=>{
  let userId = req.user._id;
   let user = await User.findById(userId).populate("cart");
   //   console.log(user, "sam");
  let totalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);
  //   console.log(totalAmount);

  res.render("cart/cart", { user, totalAmount });
})

router.get('/user/cart/:id',isLoggedIn, async(req, res)=>{
 try{
  let {id} = req.params;
  let userId = req.user._id;
  await User.findByIdAndUpdate(userId,{$pull:{"cart":id}});
  res.redirect('/user/cart');
 }
 catch(err){
   console.log(err);
 }
})

// creating route for payment
router.get('/checkout/:id',async(req,res)=>{

  try{
    let userId = req.params.id;
    let user = await User.findById(userId).populate("cart");
    //   console.log(user, "sam");
   let totalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);
    let quantity1 = user.cart.length;
    
     const session = await stripe.checkout.sessions.create({ 
  
        line_items: user.cart.map((item)=>{
          return {
            price_data: {
              currency: 'inr',
              product_data: {
                name: item.name,
              },
              unit_amount: item.price*100,
            },
            quantity:1
          }
        }),
        mode: 'payment',
        success_url: 'http://localhost:4242/success',
        cancel_url: 'http://localhost:4242/cancel',
        
      });
     
      res.redirect(303, session.url);
  }
  catch(e){
    res.status(500).render('error',{err:e.message});
  }
 
});

//actually adding the product to the cart
router.post('/user/:productId/add',isLoggedIn, async(req,res)=>{
  try{
    let {productId} = req.params;
    let userId = req.user._id;
   let product =   await Product.findById(productId);
   let user = await User.findById(userId);
   user.cart.push(product);
   await user.save();
   res.redirect('/user/cart');
  }
  catch(e){
    res.status(500).render('error',{err:e.message});
}
    
})

// wishlist route
router.get('/user/wishlist',isLoggedIn, async(req,res)=>{
  try{
    let userId = req.user._id;
    let user = await User.findById(userId).populate("wishlist");
    res.render("products/wishlist", {products: user.wishlist});
  }
  catch(e){
    res.status(500).render('error',{err:e.message});
}

})


















module.exports = router;