const mongoose = require("mongoose");
const { string } = require("yup");



const Basket = new mongoose.Schema({
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
},
product:[
 {id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
},
size:{
  type:String,
  required:true,  
},
color:{
  type:String,
  required:true,  
}
 }],

});


module.exports = mongoose.model("Basket", Basket);
