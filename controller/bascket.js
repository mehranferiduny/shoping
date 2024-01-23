const Basket=require('../models/Basket')
const Products=require('../models/Products');


exports.addProToShop= async (data,socket)=>{
    const item={
       productId:data.productId.trim(),
       userId:data.userId.trim()
    }
  

   try {
  
     const user= await Basket.findOne({userId:item.userId});
  
     if(!user){   
    await Basket.create(item)
     }else{
      user.productId.push(item.productId);
      await user.save();
     }
    const product=await Products.find({_id:user.productId});
    socket.emit("item",product)
    
   } catch (err) {
    console.log(err);
   }

 
}


