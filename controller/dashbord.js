const sharp = require("sharp");
const shortId = require("shortid");
const appRoot = require("app-root-path");
const fs=require("fs");

const Category=require('../models/Category')
const Products=require('../models/Products');


//!category
exports.addCategory = async (req, res) => {
  const errorArr = [];

  try {
      const name=req.body.name;
      if(!name) res.send("name requrd")

      await Category.categoryValidation({name:name});
      await Category.create({name:name});
      res.send('ok')
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
        await Category.categoryValidation({name:name});
        category.name=name;
        category.save();
        res.status(201).send('ok')
    } catch (err) {
        console.log(err);
        err.inner.forEach((e) => {
            errorArr.push({
                name: e.path,
                message: e.message,
            });
        });
       res.send(errorArr)
    }

}
exports.getCategory=async(req,res)=>{
    try {
        const category=await Category.find({}).sort({ name: -1 })
        if(!category) res.status(401).send('not category in db');
        res.status(201).send(category)
        
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
          message: "Product not found.",
        });
      }
  
      await Category.findByIdAndDelete({_id:CategoryID});
  
      res.status(200).json({
        message: "Category deleted successfully.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  };




//!Products
exports.addProducts = async (req, res) => {
  
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
      res.send('ok')
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
exports.editProducts = async (req, res) => {
   
    const errorArr = [];
    const productID = req.headers.authorization;
    

    if(!productID) res.status(404).send('ProductsID requrd')

    const image = req.files ? req.files.image : {};
    const fileName = `${shortId.generate()}_${image.name}`;
    const uploadPath = `${appRoot}/public/uploads/products/${fileName}`;

    

    try {
        const Product = await Products.findOne({ _id: productID });
        if (image.data){
        await Products.ProductsValidation({ ...req.body, image });
        }else{
        await Products.ProductsValidation({
                ...req.body,
                image: {
                    name: "placeholder",
                    size: 0,
                    mimetype: "image/jpeg/HEIC",
                },
            });
        }

        if (!Product) {
            return res.redirect("/404");
        }

  
            if (image.name) {
                fs.unlink(
                    `${appRoot}/public/uploads/products/${Product.image}`,
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
            Product.title = title;
            Product.titlefa = titlefa;
            Product.description = description;
            Product.number = number;
            Product.berand = berand;
            Product.price = price;
            Product.image = image.name ? fileName : Product.image;

            await Product.save();
            return res.send('ok');
        
    } catch (err) {
        console.log(err);
        err.inner.forEach((e) => {
            errorArr.push({
                name: e.path,
                message: e.message,
            });
        });
       res.send(errorArr)
    }
};
exports.getProducts=async(req,res)=>{
    try {
        const products=await Products.find({}).sort({ title: -1 })
        if(!products) res.status(401).send('not Products in db');
        res.status(201).send(products)
        
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
  
      res.status(200).json({
        message: "Product deleted successfully.",rusalt
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message);
    }
  };