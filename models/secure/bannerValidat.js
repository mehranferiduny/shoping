const Yup = require("yup");

exports.schema = Yup.object().shape({
    title: Yup.string()
        .required("عنوان  الزامی می باشد")
        .min(5, "عنوان  نباید کمتر از 5 کارکتر باشد")
        .max(100, "عنوان  نباید بیشتر از 100 کاراکتر باشد"),
  
      
    image: Yup.object().shape({
        name: Yup.string().required("عکس محصول الزامی می باشد"),
        size: Yup.number().max(5000000, "عکس نباید بیشتر از 5 مگابایت باشد"),
        mimetype: Yup.mixed().oneOf(
            ["image/jpeg", "image/png","image/gif"],
            "تنها پسوندهای png و gif و jpeg پشتیبانی می شوند"
        ),
    }),
});
