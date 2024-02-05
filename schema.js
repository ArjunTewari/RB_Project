// server side validate
const Joi = require('joi');
 

// joi schema
const productSchema = Joi.object({
    name: Joi.string()
            .trim()
            .min(3)
            .max(50)
            .required(),
    
    img: Joi.string().trim(),

    price: Joi.number()
            .required()
            .min(0),

    category: Joi.string()
            .trim()
            .min(3)
            .max(50)
            .required(),
    
    desc: Joi.string().trim()
    
})

const reviewSchema = Joi.object({
    rating: Joi.number()
            .min(1)
            .max(5)
            .required(),
    
    Comment: Joi.string().trim()

})

const categorySchema = Joi.object({
    brandName: Joi.string()
                 .trim()
                .min(3)
                .max(50)
                .required(),
})

module.exports = {productSchema, reviewSchema, categorySchema};