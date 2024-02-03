const Products=require('../models/Products');
const Banner=require('../models/baner');
const Category=require('../models/Category')
const CategoryMin=require('../models/Categorymin')
const Basket=require('../models/Basket')
const Comment=require('../models/Comment')
const {formatDate}=require('../utils/jalali')

const {separate}=require('../utils/separate')


const split = require('split-string');



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
      const banners =await Banner.find({});
      let productbas="";
      let id=[];
      if(basckeid.length>0){
      for(let b=0;b<basckeid[0].product.length;b++){
        id.push(basckeid[0].product[b].id)
      }
       productbas=await Products.find({_id:id})
      }
   
    
      if(!products) res.status(401).send('not Products in db');
      // res.status(201).send(products)
      res.render("index/index",{
        pageTitle:'صفحه ای اصلی',
        layout:'./layouts/mainLayout',
        path: "/",
        banners,
        products,
        category,
        separate,
        user:req.user,
        productbas,
        categorymin,
   
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
 
    const basckeid=await Basket.find({userId:user.id});
   

    let productbas="";
    let id=[];
    if(basckeid.length>0){
    for(let b=0;b<basckeid[0].product.length;b++){
      id.push(basckeid[0].product[b].id)
    }
     productbas=await Products.find({_id:id})
    }

      
      if(!productId) console.log("id product is requaid");
      const product=await Products.findOne({productID:productId});
      const comment =await Comment.find({product:product.id}).sort({createdAt: "desc"})
 
      res.render('index/singelPage',{
        pageTitle:product.title,
        path: "/product",
        layout:'./layouts/mainLayout',
        product,
        category,
        basckeid,
        products,
        user:user,
        productbas,
        comment,
        separate,
        split,
        formatDate,
        categorymin
      });
  } catch (err) {
    console.log(err);
  }

}

exports.getBasket=async(req,res)=>{
  let user='';
  if(req.user){
  user=req.user
  }
  try {
    const products=await Products.find({}).sort({ createdAt: -1 })
    const category=await Category.find({}).sort({ name: -1 })
    const categorymin=await CategoryMin.find({}).sort({ name: -1 })
    const basckeid=await Basket.find({userId:user.id});


    let productbas="";
    let id=[];
    if(basckeid.length>0){
    for(let b=0;b<basckeid[0].product.length;b++){
      id.push(basckeid[0].product[b].id)
    }
     productbas=await Products.find({_id:id})
    }

    let basket=[];
    for(let i of basckeid){
      basket.push(i.product);
    }
    const bassket=basket[0];


    

    res.render('index/basketshop',{
      pageTitle:"سبد خرید",
      path: "/basket",
      layout:'./layouts/mainLayout',
      products,
      category,
      separate,
      user:req.user,
      productbas,
      categorymin,
      bassket,

    })
    
  } catch (err) {
    console.log(err);
  }
}
exports.removeItem=async(req,res)=>{
  try {
    const {data}=req.body;
    const bs = await Basket.findOne({ userId: data.userId });
     
    let bascket=[];
    for( let i of bs.product){
     bascket.push(i)
    }

    const index=bascket.findIndex(e=> e.id == data.productId);
    if(index > -1){
       bascket.splice(index,1)
    }

    bs.product=bascket;
    await bs.save();
     res.redirect("/user/basketshop")
  } catch (err) {
    console.log(err);
  }
}


exports.getAddres=async(req,res)=>{

    let user='';
    if(req.user){
    user=req.user
    }
    try {
      const products=await Products.find({}).sort({ createdAt: -1 })
      const category=await Category.find({}).sort({ name: -1 })
      const categorymin=await CategoryMin.find({}).sort({ name: -1 })
      const basckeid=await Basket.find({userId:user.id});
  
  
      let productbas="";
      let id=[];
      if(basckeid.length>0){
      for(let b=0;b<basckeid[0].product.length;b++){
        id.push(basckeid[0].product[b].id)
      }
       productbas=await Products.find({_id:id})
      }
  
      let basket=[];
      for(let i of basckeid){
        basket.push(i.product);
      }
      const bassket=basket[0];
  
  
      
  
      res.render('index/addres',{
        pageTitle:"سبد خرید",
        path: "/basket",
        layout:'./layouts/mainLayout',
        products,
        category,
        separate,
        user:req.user,
        productbas,
        categorymin,
        bassket,
  
      })
    
  } catch (err) {
    console.log(err);
  }
}




exports.sendComment=async(req,res)=>{
  try {
   
  
    if(!req.user){
      res.redirect('user/LoginPage')
    }
    const product =await Products.findOne({productID:req.params.id})
    const user = req.user;
    const {title,comment,status}=req.body;
    await Comment.commentValidation({title,comment});
    await Comment.create({title,comment,status,product,user})
    res.redirect(`/product/${req.params.id}`)
    
  } catch (err) {
    console.log(err);
  }

}



exports.categoryProduct=async(req,res)=>{
  console.log("hiii");
  try {
console.log(req);
  } catch (err) {
    console.log(err);
  }
}
