const mongoose = require("mongoose");

const { schema } = require("./secure/CategoryValidate");

const Categorymin = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'عنوان الزامی میباشد'],
        trim: true,
        minlength: [2,"تعداد کلمات نباید کمتر از 2 کارکتر باشد"],
        maxlength: [100,"تعداد کلمات نباید بیشتر از 100 کارکتر باشد"],
    },
    IdCat:{
      type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    }
   
});

Categorymin.index({ name: "text"});

Categorymin.statics.categoryValidation = function (body) {
    return schema.validate(body, { abortEarly: false });
};

module.exports = mongoose.model("Categorymin", Categorymin);
