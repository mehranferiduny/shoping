const Products=require('../models/Products');
const Category=require('../models/Category')
const CategoryMin=require('../models/Categorymin')
const {separate}=require('../utils/separate')
const split = require('split-string');


const Basket=require('../models/Basket')


//! Products
exports.getProducts=async(req,res)=>{
  let user='';
  if(req.user){
  user=req.user
  }

  try {
      const products=await Products.find({}).sort({ createdAt: -1 })
      const category=await Category.find({}).sort({ name: -1 })
      const categorymin=await CategoryMin.find({}).sort({ name: -1 })
      const basckeid=await Basket.find({userId:user.id}).sort({ name: -1 });
      if(basckeid.length > 0){
      var productbas=await Products.find({_id:basckeid[0].productId})
      }

    
      if(!products) res.status(401).send('not Products in db');
      // res.status(201).send(products)
      res.render("index/product",{
        pageTitle:'صفحه ای اصلی',
        path: "/",
        products,
        category,
        separate,
        user:req.user,
        productbas,
        categorymin
      })
      
  } catch (err) {
      console.log(err);
      
  }
}

exports.singelProduct=async(req,res)=>{
  let user='';
  if(req.user){
  user=req.user
  }

  try {
    const productId=req.params.id;
    const products=await Products.find({}).sort({ createdAt: -1 })
    const category=await Category.find({}).sort({ name: -1 })
    const categorymin=await CategoryMin.find({}).sort({ name: -1 })
    const basckeid=await Basket.find({userId:user.id}).sort({ name: -1 });
    if(basckeid.length > 0){
      var productbas=await Products.find({_id:basckeid[0].productId})
      }
      
      if(!productId) console.log("id product is requaid");
      const product=await Products.findOne({productID:productId});

      res.render('index/singelPage',{
        pageTitle:"نام محصول",
        path: "/",
        product,
        category,
        basckeid,
        products,
        user:user,
        productbas,
        separate,
        split,
        categorymin
      });
  } catch (err) {
    console.log(err);
  }

}

