const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      // api_user: "duynguyen",
      api_key:
        "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",
    },
  })
);
const Product = require("../models/product");

exports.getProduct = (req, res, next) => {
  Product.find().then((product) => {
    res.json(product);
  });
};

exports.getDetail = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Product.findById(id).then((product) => {
    if (product) {
      res.json(product);
    }
  });
};
exports.getPagination = (req, res, next) => {
  const { category, count, page, search } = req.query;
  console.log(category);
  if (category == "all") {
    Product.find().then((data) => {
      res.json(data);
    });
  } else {
    Product.find({ category: category }).then((data) => {
      res.json(data);
    });
  }
  // res.json({});
};
exports.getmail = (req, res, next) => {
  // console.log("gui");
  // console.log(req.role);
  console.log("session", req.session.id);
  // transporter.sendMail({
  //   to: "nnduy1999@gmail.com",
  //   from: "duynnfx17791@funix.edu.vn",
  //   subject: "get mail",
  //   html: "<h1>hihihihih</h1>",
  // });
  // console.log("đã gửi thư");
  // req.session.destroy((err) => {
  //   console.log(err);
  //   // res.redirect("/");
  // });
  const connectSid = req.cookies["connect.sid"];
  res.json({ a: connectSid });
};

exports.testsession = (req, res, next) => {
  res.send(req.session.isLoggedIn);
};

exports.postCreatProduct = (req, res, next) => {
  const { name, price, category, shortDesc, longDesc, img } = req.body;
  console.log("#58", req.role);
  if (req.role !== "admin") {
    const error = new Error("Not ADMIN");
    error.statusCode = 401;
    res.json({ status: false });
    throw error;
  }
  const newProduct = new Product({
    category: category,
    img1: img[0],
    img2: img[1],
    img3: img[2],
    img4: img[3],
    price: price,
    name: name,
    long_desc: longDesc,
    short_desc: shortDesc,
  });
  newProduct.save();
  res.json({ status: true });
};

exports.postDelete = (req, res, next) => {
  if (req.role !== "admin") {
    const error = new Error("Not ADMIN");
    error.statusCode = 401;
    res.json({ status: false });
    throw error;
  }
  const id = req.params.id;
  // console.log("delete", id);
  Product.findByIdAndDelete(id)
    .then((data) => {
      res.json({ status: true });
    })
    .catch((err) => console.log(err));
};
exports.postEditProduct = (req, res, next) => {
  if (req.role !== "admin") {
    const error = new Error("Not ADMIN");
    error.statusCode = 401;
    res.json({ status: false });
    throw error;
  }
  const { name, category, shortDesc, longDesc, price, id, img } = req.body;
  Product.findById(id)
    .then((product) => {
      product.name = name;
      product.price = price;
      product.category = category;
      product.img1 = img[0];
      product.img2 = img[1];
      product.img3 = img[2];
      product.img4 = img[3];
      product.short_desc = shortDesc;
      product.long_desc = longDesc;
      return product.save();
    })
    .then((data) => {
      res.json({ status: true });
    })
    .catch((err) => console.log(err));
};
