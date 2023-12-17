const Yup = require("yup");

exports.schema = Yup.object().shape({
    name: Yup.string()
        .required("عنوان دسته بندی الزامی می باشد")
        .min(2, "عنوان دسته بندی نباید کمتر از 2 کارکتر باشد")
        .max(100, "عنوان دسته بندی نباید بیشتر از 100 کاراکتر باشد"),
     

});
