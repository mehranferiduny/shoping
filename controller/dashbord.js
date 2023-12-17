const sharp = require("sharp");
const shortId = require("shortid");
const appRoot = require("app-root-path");

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