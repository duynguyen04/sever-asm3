const { query } = require("express");
const Order = require("../models/order");

exports.postOrder = (req, res, next) => {
  const data = req.body;
  //   console.log(data);
  const cartItems = data.cart.map((product) => ({
    idProduct: product.idProduct,
    nameProduct: product.nameProduct,
    priceProduct: product.priceProduct,
    quantity: product.count,
    img: product.img,
  }));
  const order = new Order({
    idOrder: data.idOrder,
    cart: cartItems,
    user: {
      email: data.email,
      fullname: data.fullname,
      phone: data.phone,
      address: data.address,
    },
    total: data.total,
  });
  order.save((err) => {
    if (err) {
      res.json({
        status: false,
      });
    } else {
      res.json({
        status: true,
      });
    }
  });
};
exports.getHistory = (req, res, next) => {
  //   console.log(req, query.userId);
  const idOrder = req.query.idUser;
  Order.find({ idOrder: idOrder }).then((data) => {
    if (data) {
      res.json(data);
    } else {
      res.json({});
    }
  });
};

exports.getDetailHistory = (req, res, next) => {
  const id = req.params.id;
  console.log("history", id);
  Order.findById(id).then((data) => {
    if (data) {
      res.json(data);
    } else {
      res.json({});
    }
  });
};
