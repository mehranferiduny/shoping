const  express  = require("express");
// const { authenticated } = require("../middlewares/auth");

const indexController = require("../controller/index");
// const userController = require("../controller/users");

const router = new express.Router();

//!category
// router.get("/getCategorys",  adminController.getCategory);

//! @Producte

router.get("/",  indexController.getProducts);
router.get("/product/:id",  indexController.singelProduct);
router.get("/category/:id",  indexController.categoryProduct);



//!like
router.get("/likeProduct",  indexController.likeProduct);

//!edit user
router.post("/editUser/:id",  indexController.editUser);



router.get("/pardakhet",  indexController.pardakhet);
router.get("/order",  indexController.order);



module.exports = router;
