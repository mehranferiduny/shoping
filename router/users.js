const  express  = require("express");
// const { authenticated } = require("../middlewares/auth");

const userController = require("../controller/users");
const { authenticated } = require("../middlewares/auth");

const router = new express.Router();


//! @Users

router.post("/addUser",  userController.addUsers);
router.post("/loginUser",  userController.loginUser,userController.rememberMe);
router.post("/editUser/:id",  userController.editUser);
router.get("/logout", authenticated, userController.logout);




//!page
router.get("/LoginPage",  userController.loginPage);
router.get("/registerPage",  userController.registerPage);
router.get("/editPage",  userController.editPage);



module.exports = router;
