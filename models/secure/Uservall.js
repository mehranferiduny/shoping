const Yup = require("yup");

exports.schemaEdit = Yup.object().shape({
  name: Yup.string()
        .required("نام شما الزامی می باشد"),
  family: Yup.string()
        .required("نام خانوادگی شما الزامی می باشد"),
  address: Yup.string()
        .required("آدرس شما الزامی می باشد"),
    codemeli: Yup.string()
        .required("کد ملی شما الزامی می باشد"),
    codeposti: Yup.string()
        .required("کد پستی شما الزامی می باشد"),
        email: Yup.string()
        .email("ایمیل معتبر نمی باشد")
        .required("ایمیل الزامی می باشد"),
      

});


