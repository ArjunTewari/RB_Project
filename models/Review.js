const mongoose = require('mongoose'); //its imp to require so that schema is created

// to create schema

const reviewSchema = new mongoose.Schema({
    rating:{
        type:Number,
        min:0,
        max:5
    },
    comment:{
        type:String,
        trim:true
    }
},{
    timestamps:true
})

// after create schema, model is created
let Review = mongoose.model('Review', reviewSchema);

// to use Product model we have to export 
module.exports = Review;
