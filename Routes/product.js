const express = require("express");
const Product = require('../models/Product'); //we need data from model
const router = express.Router(); //mini instance of app
const Review = require('../models/Review');
const Category = require('../models/Category');
const {validateProduct, isLoggedIn, isSeller, isAuthor} = require('../middleware');
// const { validateCategory} = require('./middleWare');


// to show all the product
router.get("/products", async (req, res)=>{
    
    try{
        let products;
        // await Category.updateMany({isActive:false});
        let categories = await Category.find({});
        if(req.query && req.query.category){
            let {category} = req.query;
                 products =  await Product.find({category:{$in:category}})
                  
                //  await Category.findOneAndUpdate({brandName:category},{isActive:true})
                
              categories =   categories.map((singleCategory)=>{
                if(category.length){
                    for(let item of category){
                        if(singleCategory.brandName === item){
                            singleCategory.isActive = true;
                        }
                    }
                } 
                 if(singleCategory.brandName === category){
                    singleCategory.isActive = true;
                }  
                    
                    
                    return singleCategory;
                })
                 
                console.log(categories);
                console.log(req.query);
        }else{
            products =   await Product.find({}); // as find() is monogoose method it return promise
        }
         
        
        // console.log(categories);
        res.render("products/index", {products, categories});
        
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }

})

// to show the form for new product
router.get('/products/new',isLoggedIn, (req,res)=>{
    try{
        res.render('products/new')
        console.log('hello');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
   
})



// Add particular products
router.post('/products',validateProduct,isLoggedIn,isSeller, async (req,res)=>{
    try{
        let{name, img, price, desc, category} = req.body;
    
    
        await Product.create({name, img, price, desc, category, author:req.user._id});
        const brandName = await Category.findOne({brandName : category})
        if(!brandName){
           await Category.create({brandName : category});
        }
        req.flash('success', 'Product added successfully');
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
   
   

  
})

// show particular product
router.get('/products/:id',isLoggedIn, async (req, res)=>{

    try{
        let {id} = req.params;
        let foundProduct =  await Product.findById(id).populate('reviews');
        let products =[] ;
        // console.log(foundProduct);
        if(foundProduct.category){
             products =  await Product.find({category:{$in:foundProduct.category}})
            // console.log(products);
           products= products.filter((product)=>{
            return product.id !== id;
           })
         
        }

        res.render('products/show', {foundProduct,products, msg:req.flash('msg')});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
   
}) 

// form to edit a product
router.get('/products/:id/edit',isLoggedIn,isSeller, async(req,res)=>{

    try{
        let {id} = req.params;
        let foundProduct =  await Product.findById(id);
        res.render('products/edit', {foundProduct});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
   
})

// update a edit product
router.patch('/products/:id',isLoggedIn,isSeller,isAuthor,validateProduct, async (req, res)=>{
    try{
        let {id} = req.params;
        let{name, img, price, desc,category } = req.body;
         await Product.findByIdAndUpdate(id , {name, img, price, desc, category});
         req.flash('success', 'Product edited successfully');
         res.redirect(`/products/${id}`);
    } 
     catch(e){
        res.status(500).render('error',{err:e.message});
    }
   
   
})

// delete a particular product
router.delete('/products/:id',isLoggedIn, isSeller,isAuthor, async(req, res)=>{
    try{
        let {id} = req.params;
        let product = await Product.findById(id);
        for(let item of product.reviews){
            await Review.findByIdAndDelete(item);
        }
        await Product.findByIdAndDelete(id);
        req.flash('success', 'Product deleted successfully');
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
   
    
})
// we using router so we export that in app.js
module.exports = router;