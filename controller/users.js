const passport = require("passport");
const Users=require('../models/Users');

//!Users
exports.addUsers = async (req, res) => {

  const errorArr = [];

  try {
   
    req.body={... req.body};
    const user= await Users.findOne({phone: req.body.phone});
    if(user) {
        errorArr.push({message:" شما قبلا ثبت نام کردین لطفا وارد شوید"}) 
        return res.send(errorArr)}
          if(!req.body) res.send("body requrd")
          await Users.userValidationsabt(req.body);

          await Users.create({
              ...req.body
          });
      res.status(200).send('ok')
  } catch (err) {
  
      err.inner.forEach((e) => {
          errorArr.push({
              name: e.path,
              message: e.message,
          });
      });
      res.send(errorArr)

      
  }
};

exports.loginUser= (req,res,next)=>{
  passport.authenticate("local", {
            failureRedirect: res.status(400),
            successRedirect:res.status(200),
            failureFlash: true,
        })(req, res,next);
    
}
exports.rememberMe = (req, res) => {
    // if (req.body.remember) {
    //     req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000; // 1 day 24
    // } else {
    //     req.session.cookie.expire = null;
    // }

    res.send("ok")

   
};