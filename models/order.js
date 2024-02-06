const mongoose = require("mongoose");
const {generateUniqueNumericId} = require("../utils/randumid");



const Order = new mongoose.Schema({
basket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Basket",
},
orderID:{
  type:String,
  default: generateUniqueNumericId,
},
totall:{
  type:String,
  default:"",
},


status: {
  type: String,
  default: "first",
  enum: ["first", "second","third","fourth"],
},
createdAt: {
  type: Date,
  default: Date.now,
},

});


module.exports = mongoose.model("Order", Order);
