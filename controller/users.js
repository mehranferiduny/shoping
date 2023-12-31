const passport = require("passport");
const Users = require('../models/Users');

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

    await Users.create(
      req.body
    );
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
  

  res.redirect('/')


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

    res.render("index/editPage", {
      pageTitle: ' ویرایش کاربر ',
      path: "/",
      layout: './layouts/loginLayout',
      message: req.flash('message'),
      error: req.flash("error"),

    })

  } catch (err) {
    console.log(err);

  }
}