const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  iduser: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  products: [
    {
      product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  //   user: {
  //     email: {
  //       type: String,
  //       required: true,
  //     },
  //     userId: {
  //       type: Schema.Types.ObjectId,
  //       required: true,
  //       ref: "User",
  //     },
  //   },
});

module.exports = mongoose.model("Cart", cartSchema);
