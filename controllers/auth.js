const User = require("../models/User");
const AdminUser = require("../models/Adminuser");
const emailValidator = require("deep-email-validator");
const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const catchAsyncerror = require("../middleware/catchAsyncerror.js");
const Productselcted = require("../models/Userproduct");
const socketModule = require("../utils/Socket");
const sendEmail = require("../utils/sendEmail");
const InvitedUser = require("../models/Inviteduser");
async function isEmailValid(email) {
  return emailValidator.validate(email);
}
exports.register = catchAsyncerror(async (req, res) => {
  const {Firstname, lastname, email, password } = req.body;
  if (!Firstname,!lastname || !email || !password) {
    return res.status(400).json("plese fill all input ");
  }

  const user = await User.findOne({ email });
  const { valid, reason, validators } = await isEmailValid(email);
  console.log(user);
  const inviteuser = await InvitedUser.find({ email });
  console.log(inviteuser)
  if (!inviteuser) {
    return res.status(500).json("you are not invited");
  } else if (user) {
    return res.status(500).json("user already registered");
  } else if (inviteuser) {
    const user = await User.create({
      Firstname,
      lastname,
      email,
      password,
    });

    const io = socketModule.getIO();
    io.emit("userCreated", { message: `${Firstname, lastname} created new account` });
    sendToken(user, 201, res);
    console.log(user);
  }

  return;
});

exports.login = catchAsyncerror(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json("plz fill all input");
    }
    const user = await User.findOne({ email }).select("+password");
    console.log( req.body);
    if (!user) {
      return res.status(500).json("invalid credentials user not found");
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(500).json("password is not valid please register");
    }
 
    
    // res.status(201).json(user)
    sendToken(user, 200, res);
    const users = await User.findByIdAndUpdate(user.id, {firstlogin: true }, { new: true });
  } catch (error) {
    console.log(error);

    // res.status(500).json({ success: false });
  }
});
exports.adminregister = catchAsyncerror(async (req, res) => {
  const {Firstname, lastname, email, password } = req.body;
  console.log(lastname);
  if (!Firstname || !lastname || !email || !password) {
    return res.status(400).json("plese fill all input ");
  }
  const user = await AdminUser.findOne({ email });

  console.log(user);

if (user) {
    return res.status(500).json("user already registered");
  } else {
    const user = await AdminUser.create({
      Firstname,
      lastname,
      email,
      password,
    });

    sendToken(user, 201, res);
  }
  return;
});
exports.adminlogin = catchAsyncerror(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);

  try {
    if (!email || !password) {
      return res.status(400).json("plese fill all input ");
    }

    const user = await AdminUser.findOne({ email }).select("+password");
    if (!user) {
      return res.status(500).json("invalid credentials user not found");
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(500).json("password is not valid please register");
    }
    // res.status(201).json(user)

    sendToken(user, 200, res);
  } catch (error) {
    throw new Error(error);

    // res.status(500).json({ success: false });
  }
});
exports.logout = async (req, res, next) => {
  await res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  // option for cookie
  const options = {
    expire: new Date(Date.now + 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
exports.get_all_user = catchAsyncerror(async (req, res, next) => {
  const data = await User.find({ __v: 0 });
  return res.status(200).json(data);
});
exports.get_product_activity = catchAsyncerror(async (req, res, next) => {
  const data = await Productselcted.find({}, { __v: 0, _id: 0 });

  return res.status(200).json(data);
});

// auth user
exports.isAuthuser = catchAsyncerror(async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "plese login to access this resource" });
  } else {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    if (req.user === null) {
      req.user = await AdminUser.findById(decodedData.id);
    }
    next();
  }
});
// auth role
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        res.json(
          `Role: ${req.user.role} is not allowed  to access this resource`,
          403
        )
      );
    }
    next();
  };
};
exports.dashboard = catchAsyncerror(async (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "plese login to access this resource" });
  }

  let user = await User.findById(req.user.id);
  if (user === null) {
    user = await AdminUser.findById(req.user.id);
  }

  res.status(200).json({
    sucess: true,
    user,
  });
});
// seelct product
exports.selectproduct = catchAsyncerror(async (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "plese login to access this resource", status: false });
  }
  let user = await User.findById(req.user.id);
  const { product } = req.body;
  console.log(product);
  await Productselcted.create({
    email: user.email,
    Product: product,
    user: user.Firstname,
  });

  await User.findByIdAndUpdate({_id:req.user.id},{$addToSet: {product:product}})
  const io = socketModule.getIO();

  io.emit("selectproduct", { message: `${user.email} select ${product}` });

  res.status(200).json({
    sucess: true,
    message:
      "thank you for making your selection. Your subscription access code will be sent to your work email. Enjoy!",
  });
});

// Configure Nodemailer with your email service provider credentials

var transpor = nodemailer.createTransport( {
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  auth: {
    user: "aadilkhan05@outlook.com",
    pass: "hhhjgehgrsrhg@12",
  },
  tls: {
      ciphers:'SSLv3'
  }
});
exports.inviteuser = catchAsyncerror(async (req, res, next) => {
  const { email } = req.body;
  console.log(email)
let passwords =generateInvitationCode()
  // Create the email message

  const mailOptions = {
    from: "aadilkhan05@outlook.com",
    to: email,
    subject: "Invitation to Join the Member Portal",
    text: `Hello! You have been invited to join the Member Portal. Please follow the link to register: http://50.17.174.239/login  email:${email} , password:${passwords}`,
  };

  const user = await InvitedUser.findOne({ email });
  console.log(user);
  if (user ) {
    return res.json({ message: "invitation already sent" });
  }

  // Send the email
try {
  transpor.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
      return res.status(500).json({ error: "Failed to send invitation email" });
    }
    console.log("Invitation email sent:", info.response);
  });
} catch (error) {
  console.log(error);
  return res.status(500).json({ error: "Failed to send invitation email" });
}
   await InvitedUser.create({
    email,
    invite: true,
  }).then(async()=>{
    const user = await User.create({
        email,
      password:passwords
    });
  });

  return res
    .status(200)
    .json({ message: "Invitation email sent successfully" });
});
function generateInvitationCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}


exports.getuserrDetail = catchAsyncerror(async (req, res, next) => {
  const data = await User.find({firstlogin:true}, { __v: 0 ,_id:0,role:0,firstlogin:0,password:0});
  return res.status(200).json(data);
});