const mongoose = require("mongoose");


const { schema } = require("./secure/commentValidet");


const commentSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true,
    minlength: 2,
    maxlength: 100,
  },

  comment: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
  status: {
    type: String,
    default: "status-like",
    enum: ["status-like", "status-dislike"],
},
  createdAt: {
    type: Date,
    default: Date.now,
  },


});

commentSchema.statics.commentValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};



module.exports = mongoose.model("Comment", commentSchema);
