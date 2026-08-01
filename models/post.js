const mongoose = require("mongoose");
const Posts = new mongoose.Schema(
  {
    companyName: {
      type: String,
      trim: true,
      maxlength: 50,
      default: null,
    },
    departmentName: {
      type: String,
      trim: true,
      maxlength: 50,
      default: null,
    },
    refrenceEmployee: {
      type: Number,
      default: null,
      min: 0,
    },
    totalEmployee: {
      type: Number,
      default: null,
      min: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Posts", Posts);

