const { query } = require("express");
const Order = require("../models/order");
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
      transporter.sendMail({
        to: "nnduy1999@gmail.com",
        from: "duynnfx17791@funix.edu.vn",
        subject: "send mail",
        html: `
        <div>
            <h1>Xin chào ${data.fullname}</h1>
            <div>Phone: ${data.phone}</div>
            <div>Addres: ${data.address}</div>
            <table>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Hình ảnh</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
              ${
                cartItems &&
                cartItems
                  .map(
                    (item) => `
                  <tr>
                    <td>${item.nameProduct}</td>
                    <td>${item.img}</td>
                    <td>${item.priceProduct}</td>
                    <td>${item.quantity}</td>
                    <td>
                      ${item.quantity}*${item.priceProduct}
                    </td>
                  </tr>
                `
                  )
                  .join("")
              }
            </table>
            <h1>Tổng thanh toán</h1>
            <h1>${data.total}</h1>
            <h1>Cảm ơn bạn!</h1>
          </div>
      `,
      });
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
