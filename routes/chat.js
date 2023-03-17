const express = require("express");
const chatControllers = require("../controllers/chat");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/chat", isAuth, chatControllers.postCreate);

router.get("/chat/:id", isAuth, chatControllers.getmessage);

module.exports = router;
