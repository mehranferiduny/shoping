const passport = require("passport");
const Users = require('../models/Users');
const Category=require('../models/Category')
const Products=require('../models/Products');

//!Users
exports.addUsers = async (req, res) => {

  const errorArr = [];

  try {

    const user = await Users.findOne({ phone: req.body.phone });
    if (user) {
      errorArr.push({ message: " شما قبلا ثبت نام کردین لطفا وارد شوید" });
      res.render("index/registerPage", {
        pageTitle: ' ثبت نام کاربر ',
        path: "/",
        layout: './layouts/loginLayout',
        errors: errorArr,
        message: req.flash('message'),
        error: req.flash("error"),
      })
    }
    if (!req.body) res.send("body requrd")
    console.log(req.body);
    await Users.userValidationsabt(req.body);
       const {phone,password,email}=req.body;
    await Users.create({
      phone,
      password,
      email,
      name:'',
      family:"",
      address:'',
      codemeli:'',
      codeposti:'',
  });
    req.flash("message", "ثبت نام با موفقیت انجام شد.وارد شوید")
    res.status(200).redirect('/user/LoginPage')
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
};

exports.editUser=async(req,res)=>{
    
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




  try {
     
    const user = await Users.findOne({ _id: UserID });


      if (!user) {
          return res.redirect("/404");
      }

     
       await Users.userValidationedit(req.body);
     
      
         console.log(req.body);

          const { name, family, codeposti,email, codemeli,phone,address} = req.body;
          user.name=name;
          user.family=family;
          user.codemeli=codemeli;
          user.codeposti=codeposti;
          user.email=email;
          user.address=address;

          await user.save();
       
          return res.status(200).redirect('/');
      
  } catch (err) {
      console.log(err);
      err.inner.forEach((e) => {
          errorArr.push({
              name: e.path,
              message: e.message,
          });
      });
      res.render("index/editPage", {
        pageTitle: ' ویرایش کاربر ',
        path: "/",
        layout: './layouts/loginLayout',
        message: req.flash('message'),
        error: req.flash("error"),
        user:req.user,
        errors:errorArr,
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
  
  if (req.body.remember == 'on') {
    req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000; // 1 day 24
  } else {
    req.session.cookie.expire = null;
  }
  console.log(req.session)
  

  res.redirect('/')


};
exports.logout = (req, res,next) => {
  req.session = null;
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
};


//!page
exports.registerPage = async (req, res) => {
  try {

    res.render("index/registerPage", {
      pageTitle: ' ثبت نام کاربر ',
      path: "/",
      layout: './layouts/loginLayout',
      error: req.flash("error"),
      message: req.flash('message')
    })

  } catch (err) {
    console.log(err);

  }
}
exports.loginPage = async (req, res) => {

  try {

    res.render("index/loginPage", {
      pageTitle: ' ورود کاربر ',
      path: "/",
      layout: './layouts/loginLayout',
      message: req.flash('message'),
      error: req.flash("error"),

    })

  } catch (err) {
    console.log(err);

  }
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