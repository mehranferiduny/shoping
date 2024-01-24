const Basket = require("../models/Basket");
const Products = require("../models/Products");

exports.addProToShop = async (data, socket) => {
  const item = {
    productId: data.productId.trim(),
    userId: data.userId.trim(),
  };

  try {
    const user = await Basket.findOne({ userId: item.userId });

    if (!user) {
      await Basket.create(item);
    } else {
      const pro=user.productId.indexOf(item.productId)
       if(pro == -1){
      user.productId.push(item.productId);
      await user.save();
      const product = await Products.find({ _id: user.productId });
      socket.emit("item", product);
       }else{
         const product = await Products.find({ _id: user.productId });
        socket.emit("item", product);
         console.log("noo");
       }
       
    }
   
  } catch (err) {
    console.log(err);
  }
};

exports.removeItem = async (data, socket) => {
   console.log(data);
  try {
    const bs = await Basket.findOne({ userId: data.userId });
    const index = bs.productId.indexOf(data.productId);
  
    
    if (index > -1) {
      // only splice array when item is found

      bs.productId.splice(index, 1);
        // 2nd parameter means remove one item only
    }
    await bs.save();
    const product = await Products.find({ _id: bs.productId });
    socket.emit("item", product);
 
  } catch (err) {}
};
