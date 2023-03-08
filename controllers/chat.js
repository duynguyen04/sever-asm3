const io = require("../socket");
const Chat = require("../models/chat");

exports.postCreate = async (req, res, next) => {
  console.log("tạo chat");
  const content = req.body.content;
  const id = req.body.id;
  const sender = req.body.sender;

  console.log("name", content);

  const chat = await Chat.findOne({ idUser: id });
  console.log("#123@@", chat);
  if (!chat) {
    console.log("asasdasd");
    const chatdata = new Chat({
      idUser: id,
      message: {
        content: content,
        sender: sender,
      },
    });
    await chatdata.save();
  } else {
    console.log("#123", chat.message);
    // console.log("#123", chat);
    console.log("#@@", content, sender);
    chat.message.push({
      content: content,
      sender: sender,
    });
    await chat.save();
  }
  io.getIO().emit("posts", {
    action: "create",
    content: content,
  });
  //   console.log("#1", chat);
  res.json({});
};

exports.getmessage = (req, res, next) => {
  console.log("lấy chat");
  const id = req.params.id;
  //   console.log(id);
  Chat.findOne({ idUser: id }).then((data) => {
    res.json(data);
  });
};
