const Cart = require("../models/cart");

exports.postAddToCart = (req, res, next) => {
  console.log(req.query);
  res.send("acv");
};
