const sharp = require("sharp");
const shortId = require("shortid");
const appRoot = require("app-root-path");
const fs=require("fs");

const Category=require('../models/Category')
const Products=require('../models/Products');
const {separate}=require('../utils/separate')

//!dashbord
exports.getDashbord=async(req,res)=>{
  try {
      const products=await Products.find({}).sort({ title: -1 })
      if(!products) res.status(401).send('not Products in db');
      res.render('admin/index',{
        pageTitle:"dashbord",
        layout:'./layouts/dashLayot',
        path:'/dashbord'
      })
      
  } catch (err) {
      console.log(err);
      
  }
}


//!category
exports.addCategory = async (req, res) => {
  const errorArr = [];

  try {
   
      const name=req.body.name;
      if(!name) res.send("name requrd")

      await Category.categoryValidation({name:name});
      await Category.create({name:name});
    res.redirect('/dashbord/getCategorys')
  } catch (err) {
      err.inner.forEach((e) => {
          errorArr.push({
              name: e.path,
              message: e.message,
          });
      });
      res.send(errorArr);
      
  }
};
exports.editCategory =async(req,res)=>{
    const errorArr = [];
    const categoryID = req.headers.authorization;
    if(!categoryID) res.status(404).send('categoryID requrd');
    const {name}=req.body;

    try {
        const category = await Category.findOne({ _id: categoryID });
        if(!category) res.status(401).send("not id category in db")
        // await Category.categoryValidation({name:name});
        category.name=name;
        category.save();
        res.status(200).send('ok')
    } catch (err) {
        console.log(err);
        err.inner.forEach((e) => {
            errorArr.push({
                name: e.path,
                message: e.message,
            });
        });
      //  res.send(errorArr)
    }

}
exports.getCategory=async(req,res)=>{
    try {
        const category=await Category.find({}).sort({ name: -1 })
        if(!category) res.status(401).send('not category in db');
        res.render('admin/category',{
          pageTitle:'اضافه کردن دسته بندی',
          layout:'./layouts/dashLayot',
          path:'/getProducts',
          category,
        })
      
        
    } catch (err) {
        console.log(err);
        
    }
}
exports.deleteCategory = async (req, res) => {
    const CategoryID = req.headers.authorization;
  
    try {
      if (!CategoryID) {
        return res.status(400).json({
          message: "Category ID is required for deletion.",
        });
      }
  
      const category = await Category.findById({_id:CategoryID});
  
      if (!category) {
        return res.status(404).json({
          message: "category not found.",
        });
      }
  
      await Category.findByIdAndDelete({_id:CategoryID});
      res.status(200).send('ok')
      
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  };




//!Products
exports.addProducts = async (req, res) => {
  const category=await Category.find({}).sort({ name: -1 });
  const errorArr = [];

  const image = req.files ? req.files.image : {};
  const fileName = `${shortId.generate()}_${image.name}`;
  const uploadPath = `${appRoot}/public/uploads/products/${fileName}`;

  try {
   
    req.body={... req.body,image};
          if(!req.body) res.send("body requrd")
          await Products.ProductsValidation(req.body);
     

          await sharp(image.data)
              .jpeg({ quality: 70 })
              .toFile(uploadPath)
              .catch((err) => console.log(err));
  
          await Products.create({
              ...req.body,
              image: fileName,
          });
      res.redirect('/dashbord/getProducts')
  } catch (err) {
      err.inner.forEach((e) => {
          errorArr.push({
              name: e.path,
              message: e.message,
          });
      });
      res.render('admin/addproduct',{
        pageTitle:'اضافه کردن محصول',
        layout:'./layouts/dashLayot',
        path:'/getProducts',
        errors:errorArr,
        category,
        
      })
      
  }
};
exports.editProducts = async (req, res) => {
   
    const errorArr = [];
    const productID = req.params.id;
    
    

    if(!productID) res.status(404).send('ProductsID requrd')

    const image = req.files ? req.files.image : {};
    const fileName = `${shortId.generate()}_${image.name}`;
    const uploadPath = `${appRoot}/public/uploads/products/${fileName}`;
    const product = await Products.findOne({ _id: productID });
    const category=await Category.find({}).sort({ name: -1 });

    try {
       
        if (image.data){
        await Products.ProductsValidation({ ...req.body, image });
        }else{
        await Products.ProductsValidation({
                ...req.body,
                image: {
                    name: "placeholder",
                    size: 0,
                    mimetype: "image/jpeg",
                },
            });
        }

        if (!product) {
            return res.redirect("/404");
        }

  
            if (image.name) {
                fs.unlink(
                    `${appRoot}/public/uploads/products/${product.image}`,
                    async (err) => {
                        if (err) console.log(err);
                        else {
                            await sharp(image.data)
                                .jpeg({ quality: 70 })
                                .toFile(uploadPath)
                                .catch((err) => console.log(err));
                        }
                    }
                );
            }
           

            const { title, titlefa, description,number,berand, price} = req.body;
            product.title = title;
            product.titlefa = titlefa;
            product.description = description;
            product.number = number;
            product.berand = berand;
            product.price = price;
            product.image = image.name ? fileName : product.image;

            await product.save();
            return res.status(200).redirect('/dashbord/getProducts');
        
    } catch (err) {
        console.log(err);
        err.inner.forEach((e) => {
            errorArr.push({
                name: e.path,
                message: e.message,
            });
        });
        res.render('admin/editproduct',{
          pageTitle:'ویرایش کردن محصول',
          layout:'./layouts/dashLayot',
          path:'/getProducts',
          category,
          product,
          errors:errorArr,
        })
    }
};
exports.getProducts=async(req,res)=>{
    try {
        const products=await Products.find({}).sort({ title: -1 })
        const category=await Category.find({}).sort({ name: -1 })
        let sales=0;
        for(let pro of products){
              if(pro.sale>0){
                sales++;
              }
        }
      
        
       
      
        if(!products) res.status(401).send('not Products in db');
        res.render('admin/product',{
          pageTitle:"dashbord",
          layout:'./layouts/dashLayot',
          path:'/getProducts',
          products,
          sales,
          category,
          separate
        })
        
    } catch (err) {
        console.log(err);
        
    }
}
exports.deleteProducts = async (req, res) => {
    const productID = req.headers.authorization;
  
    try {
      if (!productID) {
        return res.status(400).json({
          message: "Product ID is required for deletion.",
        });
      }
  
      const product = await Products.findById({ _id: productID });
  
      if (!product) {
        return res.status(404).json({
          message: "Product not found.",
        });
      }
    
      const rusalt=await Products.findByIdAndDelete({_id:productID});
      fs.unlink(
        `${appRoot}/public/uploads/products/${rusalt.image}`,
        async (err) => {
            console.error(err);
            res.status(500).send(err);
        })
  
        res.status(200).send('ok')
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message);
    }
  };

  //!product get
  exports.getProductindex=async(req,res)=>{
    try {
      const category=await Category.find({}).sort({ name: -1 });
      if(!category){
        res.status(401).send("اول دسته بندی را اضافه کنید");
      }
      res.render('admin/addproduct',{
        pageTitle:'اضافه کردن محصول',
        layout:'./layouts/dashLayot',
        path:'/getProducts',
        category
      })
    } catch (err) {
      
    }

  }
  exports.getProductsale=async(req,res)=>{
    try {

    
      const products=await Products.find({}).sort({ title: -1 })


    
      if(!products) res.status(401).send('not Products in db');
      res.render('admin/saleproduct',{
        pageTitle:'اعمال تخفیف محصول',
        layout:'./layouts/dashLayot',
        path:'/getProducts',
        products,
        separate,
      
      })
    } catch (err) {
      
    }

  }
  exports.editProductindex=async(req,res)=>{
    const productID = req.params._id;
    try {
      const product=await Products.findOne({_id:productID }).sort({ title: -1 })
      const category=await Category.find({}).sort({ name: -1 });
      if(!category){
        res.status(401).send("اول دسته بندی را اضافه کنید");
      }
      res.render('admin/editproduct',{
        pageTitle:'ویرایش کردن محصول',
        layout:'./layouts/dashLayot',
        path:'/getProducts',
        category,
        product,
      })
    } catch (err) {
      
    }

  }
  exports.editProductsale =async(req,res)=>{
    const errorArr = [];
    const productID = req.headers.authorization;
    if(!productID) res.status(404).send('productID requrd');
    const {sale}=req.body;

    try {
        const product = await Products.findOne({ _id: productID });
        if(!product) res.status(401).send("not id product in db")
        // await Category.categoryValidation({name:name});
        product.sale=sale;
        product.save();
        res.status(200).send('ok');
    } catch (err) {
        console.log(err);
        err.inner.forEach((e) => {
            errorArr.push({
                name: e.path,
                message: e.message,
            });
        });
      //  res.send(errorArr)
    }
  }