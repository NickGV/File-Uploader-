const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/auth/register", (req, res) => {
  res.render("signup");
});
router.get("/auth/login", (req, res) => {
  res.render("login");
});

router.post(
  "/auth/register",
  [
    body("email").isEmail().withMessage("Enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  authController.register
);

router.post(
  "/auth/login",
  [
    body("email").isEmail().withMessage("Enter a valid email address"),
    body("password").notEmpty().withMessage("Password cannot be empty"),
  ],
  authController.login
);

router.get("/auth/logout", authController.logout);

module.exports = router;
