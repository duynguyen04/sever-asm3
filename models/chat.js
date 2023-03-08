const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: [
    {
      sender: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Chat", chatSchema);
