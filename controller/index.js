const Products=require('../models/Products');
const Category=require('../models/Category')
const {separate}=require('../utils/separate')





//! Products
exports.getProducts=async(req,res)=>{
  let user='';
  if(req.user){
  user=req.user
  }

  try {
      const products=await Products.find({}).sort({ createdAt: -1 })
      const category=await Category.find({}).sort({ name: -1 })
      if(!products) res.status(401).send('not Products in db');
     
      // res.status(201).send(products)
      res.render("index",{
        pageTitle:'صفحه ای اصلی',
        path: "/",
        products,
        category,
        separate,
        user:req.user,
        toust:""
      })
      
  } catch (err) {
      console.log(err);
      
  }
}