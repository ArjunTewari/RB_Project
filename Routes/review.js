const express = require("express");
const Review = require("../models/Review");
const Product = require("../models/Product");
const router = express.Router(); //mini instance of app
// const {validateReview} = require('../middleWare');

router.post('/products/:id/review', async (req, res)=>{

    try{
        let {id} = req.params;
        let{rating, comment} = req.body;
        const product = await Product.findById(id);
        const review =  new Review({rating, comment})
        product.reviews.push(review);

        await product.save();
        await review.save();
        req.flash('success','Review added susscessfully')
        res.redirect(`/products/${id}`);    
    }   
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
    
})


module.exports = router;