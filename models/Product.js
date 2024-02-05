const mongoose = require('mongoose'); //its imp to require so that schema is created
const Review = require('./Review');
 
// to create schema

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    img:{
        type:String,
        trim:true
        
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    desc:{
        type:String,
        trim:true
    },

    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId, // monogoose bhai saare schema me jao and usme jo  object_id hai dedo.
            ref: 'Review'  //schema jisme se dena hai 
        }

    ],

    category: {
        type:String,
        trim: true,
        require: true
    },
    // caterogy:[
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Category'
    //     }
    // ]
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    avgRating:{
        type:Number,
        default:0
    }
})

// after create schema, model is created
let Product = mongoose.model('Product', productSchema);

// to use Product model we have to export 
module.exports = Product;
