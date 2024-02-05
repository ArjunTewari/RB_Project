const mongoose =  require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose'); //plm


const userSchema = new mongoose.Schema({
   email: {
    type:String,
    trim:true,
    required:true
   },
   age:{
    type:Number,
    required:true
   },
   role:{
      type:String,
      required:true
   },
   cart:[
      {
         type:mongoose.Schema.Types.ObjectId,
          ref:'Product' 
      }
   ],
   wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
   
})


userSchema.plugin(passportLocalMongoose); //plm use


let User = mongoose.model('User' , userSchema);
module.exports = User;