const Basket = require("../models/Basket");
const Products = require("../models/Products");

exports.addProToShop = async (data, socket) => {




  try {
    const user = await Basket.findOne({ userId: data.userId });
    
  
    
    if (!user) {
      await Basket.create(data);
    } else {
     const idproducs=[];
     const newproduct=data.product.id;
     for(let i=0;i<user.product.length;i++){
      idproducs.push(user.product[i].id)
     }  
     const isMach=idproducs.find(e=>{
      return e==newproduct
     })
     if(isMach==undefined){
      user.product.push(data.product)
      await user.save();
      for(let i=0;i<user.product.length;i++){
        console.log(user.product[i].id);
      const product=await Products.find({id:user.product[i].id})
    
      console.log(product);
      }
      const item={user:user,product:product}
      socket.emit("item",item)
     }else{
      console.log("nooo");
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
