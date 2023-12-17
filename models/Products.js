const mongoose = require("mongoose");

const { schema } = require("./secure/ProductsValidate");

const Products = new mongoose.Schema({
    title: {
        type: String,
        required: [true,'عنوان الزامی میباشد'],
        trim: true,
        minlength: [5,"تعداد کلمات نباید کمتر از 5 کارکتر باشد"],
        maxlength: [100,"تعداد کلمات نباید بیشتر از 100 کارکتر باشد"],
    },
    titlefa: {
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
    sell:{
      type: Number,
      trim: true,
      default:0

    },
    number:{
      type: Number,
      required: [true,'تعداد محصول الزامی میباشد'],
      trim: true,
    },
    berand:{
      type: String,
      required: [true,'برند محصول الزامی میباشد']
    },

    image: {
        type: String,
        required: true,
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
