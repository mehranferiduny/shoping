const  express  = require("express");
// const { authenticated } = require("../middlewares/auth");

const userController = require("../controller/users");

const router = new express.Router();


//! @Users

router.post("/addUser",  userController.addUsers);
router.post("/loginUser",  userController.loginUser,userController.rememberMe);




//!page
router.get("/LoginPage",  userController.loginPage);



module.exports = router;
