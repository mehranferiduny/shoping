const Basket=require('../models/Basket')


exports.addProToShop= async (data)=>{



  const productId=data.productId.split(",")[0].trim();
  const userId=data.productId.split(",")[1].trim();
   try {
 
    const user=await Basket.findOne({userId:userId});
  

    if(!user){
      await Basket.create({userId,productId});
    }else{
   
      user.productId.push(productId);
      await user.save();
    }
    
   } catch (err) {
    console.log(err);
   }

 
}