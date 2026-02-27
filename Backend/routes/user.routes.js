const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const usercontroller = require("../Controllers/user.controller");
const authMiddleware = require("../Middleware/auth.middleware");
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  usercontroller.registerUser,
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  usercontroller.loginUser,
);
router.get("/profile", authMiddleware.authUser, usercontroller.getUserProfile);
router.get("/logout", authMiddleware.authUser, usercontroller.logoutuser);
module.exports = router;
