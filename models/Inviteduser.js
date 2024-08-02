const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  invite: {
    type: Boolean,
  },
});

const InvitedUser = mongoose.model("InvitedUser", userSchema);
module.exports = InvitedUser;
