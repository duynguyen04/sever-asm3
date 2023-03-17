const express = require("express");
// const { body } = require("express-validator/check");

const productControllers = require("../controllers/product");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/products", productControllers.getProduct);
router.get("/products-admin", isAuth, productControllers.getProduct);

router.get("/products/:id", productControllers.getDetail);

router.get("/pagination", productControllers.getPagination);
router.get("/getmail", productControllers.getmail);
router.get("/test", productControllers.testsession);

router.post("/newproduct", isAuth, productControllers.postCreatProduct);
router.post("/delete-product/:id", isAuth, productControllers.postDelete);
router.post("/edit-product", isAuth, productControllers.postEditProduct);

module.exports = router;
