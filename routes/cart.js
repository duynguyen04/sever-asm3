const express = require("express");
const cartControllers = require("../controllers/cart");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/carts/add", isAuth, cartControllers.postAddToCart);

module.exports = router;
