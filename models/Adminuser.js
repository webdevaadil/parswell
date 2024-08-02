const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  Firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    select: false,
  },
  role:{
    type:String,
    default:"Admin"
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
userSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
  
userSchema.methods.matchPassword = async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password);
  };
const AdminUser =mongoose.model("adminuser", userSchema);
module.exports = AdminUser