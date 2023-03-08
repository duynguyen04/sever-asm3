const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const chatRoute = require("./routes/chat");
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");
const MONGODB_URI =
  "mongodb+srv://duy:1@cluster0.kfrppwg.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(authRoute);
app.use(productRoute);
app.use(chatRoute);
app.use(orderRoute);

app.use((error, req, res, next) => {
  console.log("loi", error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data, status: false });
});

mongoose.connect(MONGODB_URI).then((a) => {
  const server = app.listen(5000);
  const io = require("./socket").init(server);
  io.on("connection", (socket) => {
    console.log("Client connected");
  });
});
