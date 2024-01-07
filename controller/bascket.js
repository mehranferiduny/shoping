const Basket=require('../models/Basket')



exports.addProToShop= async (data,socket)=>{



  const productId=data.productId.split(",")[0].trim();
  const userId=data.productId.split(",")[1].trim();
   try {
 
    const user=await Basket.findOne({userId:userId});
     const product=await Basket.find({ productId: { $in: [productId] } })
    

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


