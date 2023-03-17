const User = require("../models/user");
const bcrypt = require("bcryptjs");
// const { validationResult } = require("express-validator/check");
const { validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

exports.postSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const { fullname, email, password, phone } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      console.log(user);
      if (user) {
        res.json({ status: false });
        return;
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            fullname: fullname,
            email: email,
            password: hashedPassword,
            phone: phone,
            cart: [],
            role: "client",
          });
          return user.save();
        })
        .then((result) => {
          res.json({ status: true });
          return;
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignin = (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = new Error("Validation failed.");
  //   error.statusCode = 422;
  //   error.data = errors.array();
  //   throw error;
  // }
  const { email, password } = req.body;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("A user with this email could not be found.");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      console.log("luu ");

      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }
      req.session.isLoggedIn = true;
      req.session.user = loadedUser;
      req.session.save();
      res.status(200).json({ userId: loadedUser._id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      console.log("co loi");
      next(err);
    });
};
exports.postSigninAdmin = (req, res, next) => {
  const { email, password } = req.body;
  console.log("#76", email, password);
  let loadedUser;
  let role;
  User.findOne({ email: email })
    .then((user) => {
      role = user.role;
      if (!user) {
        const error = new Error("A user with this email could not be found.");
        error.statusCode = 401;
        throw error;
      }
      if (user.role == "client") {
        const error = new Error("Not ADMIN");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }
      req.session.isLoggedIn = true;
      req.session.user = loadedUser;
      req.session.save();
      res.status(200).json({
        userId: loadedUser._id.toString(),
        role: role,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      console.log("co loi");
      next(err);
    });
};

exports.getDetailData = (req, res, next) => {
  const iduser = req.params.id;
  console.log(iduser);
  User.findById(iduser)
    .then((user) => {
      if (user) {
        res.json(user);
      }
    })
    .catch((err) => console.log(err));
};

exports.getAlluser = (req, res, next) => {
  User.find().then((data) => {
    res.json(data);
  });
};
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    // res.redirect("/");
  });
};
