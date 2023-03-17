const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoDBStore = require("connect-mongodb-session")(session);

const cors = require("cors");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const chatRoute = require("./routes/chat");
const bodyParser = require("body-parser");

const MONGODB_URI =
  "mongodb+srv://duy:1@cluster0.kfrppwg.mongodb.net/?retryWrites=true&w=majority";

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
const app = express();
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60, //1h
      secure: false,
      sameSite: "Lax",
    },
  })
);

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
