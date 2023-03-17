const express = require("express");
// const { body } = require("express-validator/check");
const { body } = require("express-validator/check");

const authControllers = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post(
  "/users/signup",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").trim().isLength({ min: 3 }),
    body("fullname").trim().not().isEmpty(),
    body("phone").isMobilePhone(),
  ],
  authControllers.postSignup
);
router.post(
  "/users/signin",
  // [
  //   body("email").isEmail().normalizeEmail(),
  //   body("password").trim().isLength({ min: 3 }),
  // ],
  authControllers.postSignin
);
router.post("/users/signin-admin", authControllers.postSigninAdmin);

router.get("/users/:id", authControllers.getDetailData);
router.get("/users", isAuth, authControllers.getAlluser);
router.post("/logout", isAuth, authControllers.postLogout);

module.exports = router;
