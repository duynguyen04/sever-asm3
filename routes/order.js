const express = require("express");
const orderControllers = require("../controllers/order");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/checkout", isAuth, orderControllers.postOrder);

router.get("/histories", isAuth, orderControllers.getHistory);

router.get("/detail-histories/:id", isAuth, orderControllers.getDetailHistory);

module.exports = router;
