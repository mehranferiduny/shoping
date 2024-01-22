const Basket=require('../models/Basket')
const Products=require('../models/Products');


exports.addProToShop= async (data,socket)=>{

  const productId=data.productId.trim();
  const userId=data.userId.trim();
   try {
 
    const user=await Basket.findOne({userId:userId});
     const product=await Basket.find({ productId: { $in: [productId] } })
     if(product.length >0){
     var item= await Products.find({_id:product[0].productId})
     }
     socket.emit("item",item)
    if(!user){
      await Basket.create({userId,productId});
      return socket.emit("secses")
    }else{

      if(product.length > 0){
        return socket.emit("add-befor")
      }else{
   
      user.productId.push(productId);
      await user.save();
      
      return socket.emit("secses")
      }
    }
    
   } catch (err) {
    console.log(err);
   }

 
}


