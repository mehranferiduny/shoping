const sharp = require("sharp");
const shortId = require("shortid");
const appRoot = require("app-root-path");
const fs=require("fs");

const Category=require('../models/Category')
const Products=require('../models/Products');



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
    // console.log(req.body);
    const errorArr = [];
    const productID = req.headers.authorization;
    

    if(!productID) res.send('ProductsID requrd')

    const image = req.files ? req.files.image : {};
    const fileName = `${shortId.generate()}_${image.name}`;
    const uploadPath = `${appRoot}/public/uploads/products/${fileName}`;

    const Product = await Products.findOne({ _id: productID });

    try {
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