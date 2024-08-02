const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  Firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    unique:true,

  },
  password: {
    type: String,
    select: "false",
  },
  role:{
    type:String,
    default:"User"
  },
  firstlogin:{
    type:Boolean,
    default:false

    
  },
  product:{
    type:Array
  }
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  userSchema.methods.matchPassword = async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password);
  };
  userSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
const User =mongoose.model("User", userSchema);
module.exports = User