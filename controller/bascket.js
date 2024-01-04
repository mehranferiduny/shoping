const Basket=require('../models/Basket')
const User=require('../models/Users')

exports.addProToShop= async (data,req,res)=>{
    try {
      
      if(!data) console.log("data not");
      const userq=await Basket.findOne({userId:data.userId})
      if(!userq)
     {
      await Basket.create(data)
     }
    await userq.productId.push(data.productId);
    await userq.save()
 
    } catch (err) {
      
    }
}