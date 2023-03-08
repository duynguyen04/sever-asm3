const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  idOrder: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  cart: [
    {
      idProduct: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      quantity: { type: Number, required: true },
      nameProduct: { type: String, required: true },
      priceProduct: { type: Number, required: true },
      img: { type: String, required: true },
    },
  ],
  user: {
    email: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  total: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
