const passport = require("passport");
const { Strategy } = require("passport-local");
const bcrypt = require("bcryptjs");

const User = require("../models/Users");

passport.use(
    new Strategy(
        { usernameField: "phone",
        passwordField: 'password',
        passReqToCallback: false },
        
         async (phone, password, done) => {
        try {
            const user = await User.findOne({ phone });
            if (!user) {
                return done(null, false, {
                    message: "کاربری با این شماره ثبت نام نشده",
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return done(null, user); //req.user
            } else {
                return done(null, false, {
                    message: "نام کاربری یا کلمه عبور صحیح نمی باشد",
                });
            }
        } catch (err) {
            console.log(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async(id, done) => {

    try {
        const u=await User.findById(id)
        done("",u)
        
    } catch (err) {
        done(err,"")
        console.log(err);
    }
  
  
});
