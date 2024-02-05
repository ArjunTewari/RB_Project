const { boolean } = require('joi');
const mongoose = require('mongoose'); //its imp to require so that schema is created

// to create schema

const categorySchema = new mongoose.Schema({
    brandName:{
        type:String,
        trim:true,
        required:true
    },
    isActive:{
        type:Boolean,
        default:false
    }
    
})

// after create schema, model is created
let Category = mongoose.model('Category', categorySchema);

// to use Product model we have to export 
module.exports = Category;
