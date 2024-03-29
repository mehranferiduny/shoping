const Products = require("../models/Products");
const User = require("../models/Users");
const Banner = require("../models/baner");
const Category = require("../models/Category");
const CategoryMin = require("../models/Categorymin");
const Basket = require("../models/Basket");
const Comment = require("../models/Comment");
const { formatDate } = require("../utils/jalali");

const { separate } = require("../utils/separate");

const split = require("split-string");

//! Products
exports.getProducts = async (req, res) => {
  let user = "";
  if (req.user) {
    user = req.user;
  }

  try {
    const products = await Products.find({}).sort({ createdAt: -1 });
    const category = await Category.find({}).sort({ name: -1 });
    const categorymin = await CategoryMin.find({}).sort({ name: -1 });
    const basckeid = await Basket.find({ userId: user.id }).sort({ name: -1 });
    const banners = await Banner.find({});
    let productbas = "";
    let id = [];
    if (basckeid.length > 0) {
      for (let b = 0; b < basckeid[0].product.length; b++) {
        id.push(basckeid[0].product[b].id);
      }
      productbas = await Products.find({ _id: id });
    }

    if (!products) res.status(401).send("not Products in db");
    // res.status(201).send(products)
    res.render("index/index", {
      pageTitle: "صفحه ای اصلی",
      layout: "./layouts/mainLayout",
      path: "/",
      banners,
      products,
      category,
      separate,
      user: req.user,
      productbas,
      categorymin,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.singelProduct = async (req, res) => {
  let user = "";
  if (req.user) {
    user = req.user;
  }

  try {
    const productId = req.params.id;
    const products = await Products.find({}).sort({ createdAt: -1 });
    const category = await Category.find({}).sort({ name: -1 });
    const categorymin = await CategoryMin.find({}).sort({ name: -1 });

    const basckeid = await Basket.find({ userId: user.id });

    let productbas = "";
    let id = [];
    if (basckeid.length > 0) {
      for (let b = 0; b < basckeid[0].product.length; b++) {
        id.push(basckeid[0].product[b].id);
      }
      productbas = await Products.find({ _id: id });
    }

    if (!productId) console.log("id product is requaid");
    const product = await Products.findOne({ productID: productId });
    const comment = await Comment.find({ product: product.id }).sort({
      createdAt: "desc",
    });

    //!like
    let likestatus = false;
    if (user != "") {
      if(user.like.length > 0){
      for (let like of user.like) {
        if (like._id == product.id) {
          likestatus=true;
        }
      }
    }
  }
    res.render("index/singelPage", {
      pageTitle: product.title,
      path: "/product",
      layout: "./layouts/mainLayout",
      product,
      category,
      basckeid,
      products,
      user: user,
      productbas,
      comment,
      separate,
      split,
      formatDate,
      categorymin,
      likestatus
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getBasket = async (req, res) => {
  let user = "";
  if (req.user) {
    user = req.user;
  }
  try {
    const products = await Products.find({}).sort({ createdAt: -1 });
    const category = await Category.find({}).sort({ name: -1 });
    const categorymin = await CategoryMin.find({}).sort({ name: -1 });
    const basckeid = await Basket.find({ userId: user.id });

    let productbas = "";
    let id = [];
    if (basckeid.length > 0) {
      for (let b = 0; b < basckeid[0].product.length; b++) {
        id.push(basckeid[0].product[b].id);
      }
      productbas = await Products.find({ _id: id });
    }

    let basket = [];
    for (let i of basckeid) {
      basket.push(i.product);
    }
    const bassket = basket[0];

    res.render("index/basketshop", {
      pageTitle: "سبد خرید",
      path: "/basket",
      layout: "./layouts/mainLayout",
      products,
      category,
      separate,
      user: req.user,
      productbas,
      categorymin,
      bassket,
      basckeid,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.removeItem = async (req, res) => {
  try {
    const { data } = req.body;
    const bs = await Basket.findOne({ userId: data.userId });

    let bascket = [];
    for (let i of bs.product) {
      bascket.push(i);
    }

    const index = bascket.findIndex((e) => e.id == data.productId);
    if (index > -1) {
      bascket.splice(index, 1);
    }

    bs.product = bascket;
    await bs.save();
    res.redirect("/user/basketshop");
  } catch (err) {
    console.log(err);
  }
};

exports.getAddres = async (req, res) => {
  let user = "";
  if (req.user) {
    user = req.user;
  }

  try {
    if (!req.user) {
      return res.redirect("/user/LoginPage");
    }

    const products = await Products.find({}).sort({ createdAt: -1 });
    const category = await Category.find({}).sort({ name: -1 });
    const categorymin = await CategoryMin.find({}).sort({ name: -1 });
    const basckeid = await Basket.find({ userId: user.id });
    const basck = await Basket.findOne({ userId: user.id });

    let productbas = "";
    let id = [];
    if (basckeid.length > 0) {
      for (let b = 0; b < basckeid[0].product.length; b++) {
        id.push(basckeid[0].product[b].id);
      }
      productbas = await Products.find({ _id: id });
    }

    let basket = [];
    for (let i of basckeid) {
      basket.push(i.product);
    }
    const bassket = basket[0];

    let tot = 0;
    for (let prod of productbas) {
      bassket.forEach(e=>{
        if(e.id.toString()== prod._id.toString()){
        tot =  tot+ (prod.price*e.number) ;
      }
      })
   }
   basck.totall = tot;
    await basck.save();

    res.render("index/addres", {
      pageTitle: "سبد خرید",
      path: "/basket",
      layout: "./layouts/mainLayout",
      products,
      category,
      separate,
      user: req.user,
      productbas,
      categorymin,
      bassket,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.sendComment = async (req, res) => {
  try {
    if (!req.user) {
      res.redirect("user/LoginPage");
    }
    const product = await Products.findOne({ productID: req.params.id });
    const user = req.user;
    const { title, comment, status } = req.body;
    await Comment.commentValidation({ title, comment });
    await Comment.create({ title, comment, status, product, user });
    res.redirect(`/product/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
};

exports.categoryProduct = async (req, res) => {
  const catId = req.params.id;
  let user = "";
  if (req.user) {
    user = req.user;
  }

  try {
    const product = await Products.find({ categorymin: catId });
    const category = await Category.find({}).sort({ name: -1 });
    const categorymin = await CategoryMin.find({}).sort({ name: -1 });
    const catminproduct = await CategoryMin.findOne({ _id: catId });
    const catproduct = await Category.findOne({ _id: catminproduct.IdCat });

    const basckeid = await Basket.find({ userId: user.id }).sort({ name: -1 });
    let productbas = "";
    let id = [];
    if (basckeid.length > 0) {
      for (let b = 0; b < basckeid[0].product.length; b++) {
        id.push(basckeid[0].product[b].id);
      }
      productbas = await Products.find({ _id: id });
    }

    res.render("index/search", {
      pageTitle: `دسته بندی : ${catminproduct.name} `,
      layout: "./layouts/mainLayout",
      product,
      category,
      separate,
      user: req.user,
      productbas,
      categorymin,
      catproduct,
      catminproduct,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.likeProduct = async (req, res) => {
 
  let user = "";
  if (req.user) {
    user = req.user;
  }
    if(user == ""){
      return res.redirect('/user/LoginPage')
    }
    const likepro=[];

    for(let like of user.like){
      likepro.push(like._id)
    } 

    


  try {
    const product = await Products.find({ _id: { $in :likepro} });
    const category = await Category.find({}).sort({ name: -1 });
    const categorymin = await CategoryMin.find({}).sort({ name: -1 });


    const basckeid = await Basket.find({ userId: user.id }).sort({ name: -1 });
    let productbas = "";
    let id = [];
    if (basckeid.length > 0) {
      for (let b = 0; b < basckeid[0].product.length; b++) {
        id.push(basckeid[0].product[b].id);
      }
      productbas = await Products.find({ _id: id });
    }

    res.render("index/likepage", {
      pageTitle: `علاقه‌مندی ها`,
      layout: "./layouts/mainLayout",
      product,
      category,
      separate,
      user: req.user,
      productbas,
      categorymin,

    });
  } catch (err) {
    console.log(err);
  }
};


exports.editUser=async(req,res)=>{
  let user = "";
  if (req.user) {
    user = req.user;
  }

  const errorArr = [];
  const UserID = req.params.id;
  if(!UserID) {
    errorArr.push({ message: " از پرفایل خود خارج شدید دوباره امتحان کنید" });
    res.render("index/loginPage", {
      pageTitle: ' ورورد کاربر ',
      path: "/",
      layout: './layouts/loginLayout',
      errors: errorArr,
      message: req.flash('message'),
      error: req.flash("error"),
    })
  }
  const products = await Products.find({}).sort({ createdAt: -1 });
  const category = await Category.find({}).sort({ name: -1 });
  const categorymin = await CategoryMin.find({}).sort({ name: -1 });
  const basckeid = await Basket.find({ userId: user.id }).sort({ name: -1 });

  let productbas = "";
  let id = [];
  if (basckeid.length > 0) {
    for (let b = 0; b < basckeid[0].product.length; b++) {
      id.push(basckeid[0].product[b].id);
    }
    productbas = await Products.find({ _id: id });
  }


  let basket = [];
  for (let i of basckeid) {
    basket.push(i.product);
  }
  const bassket = basket[0];

  let tot = 0;
  for (let prod of productbas) {
    tot = prod.price + tot;
    tot = tot - prod.sale;
  }
  basckeid[0].totall = tot;
  await basckeid[0].save();


  try {
   

    const user = await User.findOne({ _id: UserID });
    const bascket = await Basket.findOne({ userId: user.id })

      if (!user) {
          return res.redirect("/404");
      }

     
       await User.userValidationedit(req.body);
     
      
     

          const { name, family, codeposti,email, codemeli,home,address,ersal} = req.body;
          user.name=name;
          user.family=family;
          user.codemeli=codemeli;
          user.codeposti=codeposti;
          user.email=email;
          user.address=address;
          user.home=home;
          bascket.ersal=ersal;
          if(ersal=="post"){
            bascket.totall=parseInt(bascket.totall) + 60000;
          }
          await bascket.save();
          await user.save();
          res.redirect('/pardakhet')
       
        //   return res.status(200).redirect('/');
      
  } catch (err) {
      console.log(err)
      err.inner.forEach((e) => {
          errorArr.push({
              name: e.path,
              message: e.message,
          });
      });
      res.render("index/addres", {
        pageTitle: "سبد خرید",
        path: "/basket",
        layout: "./layouts/mainLayout",
        products,
        category,
        separate,
        user: req.user,
        productbas,
        categorymin,
        bassket,
        errors:errorArr
      });
  }
}

exports.pardakhet= async (req,res)=>{
  let user = "";
  if (req.user) {
    user = req.user;
  }

  try {
    const products = await Products.find({}).sort({ createdAt: -1 });
    const category = await Category.find({}).sort({ name: -1 });
    const categorymin = await CategoryMin.find({}).sort({ name: -1 });
    const basckeid = await Basket.find({ userId: user.id }).sort({ name: -1 });
    const basskett = await Basket.findOne({ userId: user.id });
    let productbas = "";
    let id = [];
    if (basckeid.length > 0) {
      for (let b = 0; b < basckeid[0].product.length; b++) {
        id.push(basckeid[0].product[b].id);
      }
      productbas = await Products.find({ _id: id });
    }

    let basket = [];
    for (let i of basckeid) {
      basket.push(i.product);
    }
    const bassket = basket[0];

  console.log(basskett)
    res.render('index/pardakhet',{
      pageTitle: "صفحه ای پرداخت",
      layout: "./layouts/mainLayout",
      path: "/pardakhet",
      products,
      category,
      separate,
      user: req.user,
      productbas,
      categorymin,
      bassket,
      basskett,
      basckeid
    })
    
  } catch (err) {
    console.log(err)
  }
}


//!get order
exports.order=async (req,res)=>{
  let user = "";
  if (req.user) {
    user = req.user;
  }

  try {
    const products = await Products.find({}).sort({ createdAt: -1 });
    const category = await Category.find({}).sort({ name: -1 });
    const categorymin = await CategoryMin.find({}).sort({ name: -1 });
    const basckeid = await Basket.find({ userId: user.id }).sort({ name: -1 });
    let productbas = "";
    let id = [];
    if (basckeid.length > 0) {
      for (let b = 0; b < basckeid[0].product.length; b++) {
        id.push(basckeid[0].product[b].id);
      }
      productbas = await Products.find({ _id: id });
    }

    if (!products) res.status(401).send("not Products in db");
   
    res.render("index/order", {
      pageTitle: " سفارش ها ",
      layout: "./layouts/mainLayout",
      path: "/order",
      products,
      category,
      separate,
      user: req.user,
      productbas,
      categorymin,
    });
  } catch (err) {
    console.log(err);
  } 
}