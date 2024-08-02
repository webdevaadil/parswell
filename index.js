const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const socketModule = require("./utils/Socket");
const path = require("path");
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
const dotenv = require("dotenv");
connectDB();
//config
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT;
app.use("/api/auth", require("./routes/auth"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

const server = app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
socketModule.init(server);
