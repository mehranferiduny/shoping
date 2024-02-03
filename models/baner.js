const mongoose = require("mongoose");

const { schema } = require("./secure/bannerValidat");

const Banner = new mongoose.Schema({
  title: {
    type: String,
    required: [true,'عنوان الزامی میباشد'],
    trim: true,
    minlength: [5,"تعداد کلمات نباید کمتر از 5 کارکتر باشد"],
    maxlength: [100,"تعداد کلمات نباید بیشتر از 100 کارکتر باشد"],
},
    image: {
      type: String,
      required: true,
  },
  status: {
    type: String,
    default: "first",
    enum: ["first", "second","third"],
},
   
});



Banner.statics.BannerValidation = function (body) {
    return schema.validate(body, { abortEarly: false });
};

module.exports = mongoose.model("Banner", Banner);
