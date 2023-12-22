const Yup = require("yup");

exports.schema = Yup.object().shape({
    title: Yup.string()
        .required("عنوان محصول الزامی می باشد")
        .min(5, "عنوان محصول نباید کمتر از 5 کارکتر باشد")
        .max(100, "عنوان محصول نباید بیشتر از 100 کاراکتر باشد"),
     titlefa: Yup.string()
        .required("عنوان محصول الزامی می باشد")
        .min(5, "عنوان محصول نباید کمتر از 5 کارکتر باشد")
        .max(100, "عنوان محصول نباید بیشتر از 100 کاراکتر باشد"),

        price: Yup.string()
        .required("قیمت محصول الزامی می باشد"),
        number: Yup.string()
        .required("تعداد محصول  الزامی می باشد"),
        berand: Yup.string()
        .required("برند محصول  الزامی می باشد"),

   description: Yup.string().required("محصول جدید باید دارای محتوا باشد"),

    image: Yup.object().shape({
        name: Yup.string().required("عکس محصول الزامی می باشد"),
        size: Yup.number().max(5000000, "عکس نباید بیشتر از 5 مگابایت باشد"),
        mimetype: Yup.mixed().oneOf(
            ["image/jpeg", "image/png","image/HEIC"],
            "تنها پسوندهای png و HEIC و jpeg پشتیبانی می شوند"
        ),
    }),
});
