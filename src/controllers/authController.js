const passport = require("passport");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.register = async (req, res) => {
  folders = [];
  files = [];
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("signup", { error: errors.array()[0].msg });
  }

  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.render("index", { user, folder, files });
  } catch (error) {
    res
      .status(400)
      .render("signup", { error: "An error occurred", folders, files });
  }
};

exports.login = async (req, res, next) => {
  folders = [];
  files = [];
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res
        .status(400)
        .render("login", { error: info.message || "No user found" });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.render("index", { user, folders, files });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  res.render("index", { user: null });
};
