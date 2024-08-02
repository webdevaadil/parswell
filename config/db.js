const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const connectDB = () => {
  if (process.env.NODE_ENV === "production") {

    mongoose
    .connect("mongodb://50.17.174.239:27017/", {
      useNewUrlParser: "true",
      useUnifiedTopology: "true",
    })
    .then(() => {
      console.log("connected online");
    })
    .catch((error) => {
      console.log(error);
    });

  } else {
    mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: "true",
      useUnifiedTopology: "true",
    })
    .then(() => {
      console.log("connected");
    })
    .catch((error) => {
      console.log(error);
    });

  }
 };

module.exports = connectDB;
