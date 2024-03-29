const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { schemaSabte } = require("./secure/UsersValidete");
const { schemaEdit } = require("./secure/Uservall");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default:' ',
  },
  family: {
    type: String,
    trim: true,
    default:' ',
  },
  phone: {
    type: String,
    trim: true,
    unique: [true,"شما قبلا ثبت نام کرده اید "],
    minlength: 11,
    maxlength: 11,
    required: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
  },
  email:{
    type:String,
    default:"shoping.caro@gmail.com"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
    default:' ',
    trim: true,
  },
  codemeli: {
    type: String,
    trim: true,
    default:' ',
  },
  codeposti: {
    type: String,
    default:' ',
    trim: true,
  },
  home: {
    type: String,
    default:'',
    trim: true,
  },
  like:[
    {id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products"
  }}],
  

});

UserSchema.statics.userValidationsabt = function (body) {
  return schemaSabte.validate(body, { abortEarly: false });
};
UserSchema.statics.userValidationedit = function (body) {
  return schemaEdit.validate(body, { abortEarly: false });
};

UserSchema.pre("save", function (next) {
  let user = this;

  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

module.exports = mongoose.model("User", UserSchema);
