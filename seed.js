// require mongoose
const mongoose = require("mongoose");
// require Product model to use insertMany
const Product = require("./models/Product");
const Category = require("./models/Category");



let products = [
    {
        name: "iPhone 14 pro",
        img: "https://images.unsplash.com/photo-1677563277026-17a254ea02f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aXBob25lJTIwMTR8ZW58MHx8MHx8fDA%3D",
        price: 120000,
        desc: "very expecive aukat se bahar",
        category: 'apple'
    },

    {
        name: "MackBook m2 pro",
        img: "https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFja2Jvb2t8ZW58MHx8MHx8fDA%3D",
        price: 250000,
        desc: "naak ke barabar",
        category: 'apple'

    },

    {
        name: "Iwatch",
        img: "https://images.unsplash.com/photo-1517420879524-86d64ac2f339?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aXdhdGNofGVufDB8fDB8fHww",
        price: 51000 ,
        desc: "ye leskte hn",
        category: 'apple'
    },

    {
        name: "Ipad pro",
        img: "https://images.unsplash.com/photo-1647866367186-b2ec3b9cd3b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aXBhZCUyMHBybyUyMG0xfGVufDB8fDB8fHww",
        price: 78000 ,
        desc: "life me kuch chij dekhne ke liye hoti hai",
        category: 'apple'
    },

    {
        name:"airPods",
        img:"https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBwbGUlMjBlYWlycG9kc3xlbnwwfHwwfHx8MA%3D%3D",
        price: 30000,
        desc:"voice to achi hai",
        category: 'apple'

    },

    {
        
        name: "galaxy s21",
        img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2Ftc3VuZyUyMHBob25lfGVufDB8fDB8fHww",
        price: 50000,
        desc: "helloo",
        category: "samsung",
       
      },
]

// category model
let categories = [
  {
    brandName: "apple",
  },
  {
    brandName: "samsung",
  }
];

// as we know insertMany return a promise so we use async await
async function seedDB() {
  await Product.insertMany(products);
  for(let category of categories){
    const result = await Category.findOne({brandName : category.brandName});
    if(!result){
      await Category.create({brandName : category.brandName}); 
    }
  }
  console.log("data seeded successfully");
}

// its a function so we can use where we required
module.exports = seedDB; //jaha use hai waha require krlenge means app.js file me.
