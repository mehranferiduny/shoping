const passport = require("passport");
const Users = require('../models/Users');
const Category=require('../models/Category')
const CategoryMin=require('../models/Categorymin')
const Basket=require('../models/Basket')
const Products=require('../models/Products');
const { separate } = require("../utils/separate");


let CAPCHA_NUM=0;

//!Users

exports.addPhone=async(req,res)=>{
  
  const errorArr = [];
  let phone=0; 
  if(req.body.phone){
     phone=req.body.phone;
  }else{
    phone=req.session.phone
  }
 
  try {
    const user = await Users.findOne({ phone: phone });
  if(user){
    req.flash("error","شما قبلا ثبت نام کرده اید! ")
    return res.redirect("/user/LoginPage")
  }
    if(CAPCHA_NUM==0){
   CAPCHA_NUM=Math.floor(Math.random() * 100000) + 1;
    }else{
      CAPCHA_NUM=req.session.CAPCHA_NUM;
    }
    console.log(CAPCHA_NUM);
    req.session.phone=phone;
    req.session.CAPCHA_NUM=CAPCHA_NUM;
   return res.render('index/login/verifyNumber',{
      pageTitle:"تایید شماره موبایل",
      path: "/",
      layout: './layouts/loginLayout',
      message: req.flash('message'),
      error: req.flash("error"),
      phone,
    })
  } catch (err) {
    console.log(err);
  }

  
}
exports.addUsers = async (req, res) => {

  const errorArr = [];
  

  try {

    if (!req.body.CAPCHA_NUM){
      req.flash("error","کد ارسالی را  وارد کنید")
      return res.redirect('/user/addPhone')
    }
    console.log(req.session.phone);
    console.log(req.body.CAPCHA_NUM);
    console.log(req.session.CAPCHA_NUM);
    if(req.body.CAPCHA_NUM != req.session.CAPCHA_NUM){
      req.flash("error","کد ارسال شده را درست وارد کنید")
      return res.redirect('/user/addPhone')
    }
    res.render('index/login/sabetNam',{
      pageTitle:"ثبت کلمه عبور",
      path: "/",
      layout: './layouts/loginLayout',
      message: req.flash('message'),
      error: req.flash("error"),
      phone:req.session.phone
    })
    
       
      


  } catch (err) {

    err.inner.forEach((e) => {
      errorArr.push({
        name: e.path,
        message: e.message,
      });
    });

    res.render("index/registerPage", {
      pageTitle: ' ثبت نام کاربر ',
      path: "/",
      layout: './layouts/loginLayout',
      errors: errorArr,
      message: req.flash('message'),
      error: req.flash("error"),
    })


  }
}

exports.createUser=async(req,res)=>{
  const errorArr = [];
  const phone=req.session.phone;
  const {password,confirmPassword}=req.body;
  try {

    await Users.userValidationsabt({phone,password,confirmPassword});
    await Users.create({phone:phone,password:password})
    req.session.phone=null;
    req.session.CAPCHA_NUM=null;
    req.flash("message","ثبت نام با موفقیت انجام شد وارد شوید")
    res.redirect('/user/LoginPage')

     
    
  } catch (err) {
    console.log(err);
    err.inner.forEach((e) => {
      errorArr.push({
        name: e.path,
        message: e.message,
      });



    });
    res.render("index/login/sabetNam", {
      pageTitle: ' ثبت کلمه عبور ',
      path: "/",
      layout: './layouts/loginLayout',
      errors: errorArr,
      message: req.flash('message'),
      error: req.flash("error"),
    })

  }
}









exports.loginUser = async (req, res, next) => {

  if (!req.body["g-recaptcha-response"]) {
    req.flash("error", "لطفا تیک من ربات نیستم را بزنید");
    return res.redirect("/user/LoginPage");
  }



  const secretKey = process.env.CAPTCHA_SECRET;
  const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body["g-recaptcha-response"]}
  &remoteip=${req.connection.remoteAddress}`;

  const response = await fetch(verifyUrl, {

      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          'Access-Control-Allow-Origin':'*',
      },
  });

  const json = await response.json();

  if (json.success) {

  passport.authenticate("local", {
    failureRedirect: '/user/LoginPage',
    failureFlash: true,
  })(req, res, next);
}

}
exports.rememberMe = (req, res) => {

  if (req.body.remember == 'remember-me') {
    req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000; // 1 day 24
  } else {
    req.session.cookie.expire = null;
  }

  

  res.redirect('/')


};
exports.logout = (req, res,next) => {

  req.session = null;
  req.logout();
    res.redirect('/');

};


//!page
exports.registerPage =  (req, res) => {


    res.render("index/login/loginPage", {
      pageTitle: ' ثبت نام کاربر ',
      path: "/",
      layout: './layouts/loginLayout',
      message: req.flash('message'),
      error: req.flash("error"),

    })

}
exports.loginPage =  (req, res) => {



    res.render("index/login/loginPage2", {
      pageTitle: ' ورود کاربر ',
      path: "/",
      layout: './layouts/loginLayout',
      message: req.flash('message'),
      error: req.flash("error"),

    })

}
exports.editPage = async (req, res) => {

  try {
    const category=await Category.find({}).sort({ name: -1 })
    const products=await Products.find({}).sort({ createdAt: -1 })
    res.render("index/editPage", {
      pageTitle: ' ویرایش کاربر ',
      path: "/",
      layout: './layouts/loginLayout',
      message: req.flash('message'),
      error: req.flash("error"),
      category,
      products,
      user:req.user,
    })

  } catch (err) {
    console.log(err);

  }
}