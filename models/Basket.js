const mongoose = require("mongoose");



const Basket = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
},
productId:
 [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
}],
   
});


module.exports = mongoose.model("Basket", Basket);
