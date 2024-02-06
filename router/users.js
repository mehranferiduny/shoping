const  express  = require("express");
// const { authenticated } = require("../middlewares/auth");

const userController = require("../controller/users");
const indexController = require("../controller/index");
const basketController = require("../controller/bascket");
const { authenticated } = require("../middlewares/auth");

const router = new express.Router();


//! @Users

router.post("/addUser",  userController.addUsers);
router.post("/addPhone",  userController.addPhone);
router.get("/addPhone",  userController.addPhone);
router.post("/creatUser",  userController.createUser);
router.post("/loginUser",  userController.loginUser,userController.rememberMe);
router.get("/logout", authenticated, userController.logout);




//!page
router.get("/registerPage",  userController.registerPage);
router.get("/LoginPage",  userController.loginPage);
router.get("/editPage",  userController.editPage);



//!Bascket
router.post("/addToCart",  basketController.addProToShop);
router.get("/basketshop", indexController.getBasket);
router.get("/address", indexController.getAddres);
router.post("/deleItem", indexController.removeItem);


//!Comment
router.post("/sendComment/:id",  indexController.sendComment);


module.exports = router;
