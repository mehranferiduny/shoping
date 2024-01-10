const mongoose = require("mongoose");
const shortId = require("shortid");

const { schema } = require("./secure/ProductsValidate");

const Products = new mongoose.Schema({
  productID:{
    type:String,
    default: shortId.generate()
  },
    title: {
        type: String,
        required: [true,'عنوان الزامی میباشد'],
        trim: true,
        minlength: [5,"تعداد کلمات نباید کمتر از 5 کارکتر باشد"],
        maxlength: [100,"تعداد کلمات نباید بیشتر از 100 کارکتر باشد"],
    },

    description: {
        type: String,
        required: [true,'توضیحات محصول الزامی میباشد']
    },
    price:{
      type: Number,
      required: [true,'قیمت محصول الزامی میباشد'],
      trim: true,
    },
    sale:{
      type: Number,
      trim: true,
      default:0
    },
    new:{
       type:Boolean,
       default:false,
    },
    size:[{
      type: String,
      required: [true,'سایز محصول الزامی میباشد'],
      trim: true,
    }],
    color:[{
      type: String,
      required: [true,'رنگ محصول الزامی میباشد']
    }],
    brand:{
      type:String,
      required:[true,'برند محصول الزامی میباشد']
    },
    jens:{
      type:String,
      required:[true,'جنس محصول الزامی میباشد']
    },

    image: {
        type: String,
        required: true,
    },
    image1: {
        type: String,
        default:""
       
    },
    image2: {
        type: String,
        default:""
    },
    image3: {
        type: String,
        default:""
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

Products.index({ title: "text",titlefa:"text" });

Products.statics.ProductsValidation = function (body) {
    return schema.validate(body, { abortEarly: false });
};

module.exports = mongoose.model("Products", Products);
