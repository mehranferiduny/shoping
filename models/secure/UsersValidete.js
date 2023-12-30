const Yup = require("yup");

exports.schemaSabte = Yup.object().shape({
  phone: Yup.string()
    .min(11, "شماره تماس نباید کمتر از 11 کاراکتر باشد")
    .max(11, "شماره تماس  نباید بیشتر از 11 کاراکتر باشد")
    .required("شماره تماس الزامی می باشد"),
    password: Yup.string()
        .min(8, "کلمه عبور نباید کمتر از 8 کاراکتر باشد")
        .max(255, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد")
        .required("کلمه عبور الزامی می باشد"),
    confirmPassword: Yup.string()
        .required("تکرار کلمه عبور الزامی می باشد")
        .oneOf([Yup.ref("password"), null], "کلمه های عبور یکسان نیستند"),
});


