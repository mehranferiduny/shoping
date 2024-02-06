const mongoose = require("mongoose");
const { string } = require("yup");



const Basket = new mongoose.Schema({
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
},
ersal:{
  type:String,
  default:"tipox",
  enum:["tipox","post"]
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
},
number:{
  type:String,
  default:"1"  
},
 }],

});


module.exports = mongoose.model("Basket", Basket);
