const passport = require('passport');
const bycrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const e = require('express');

const prisma = new PrismaClient();

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bycrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred' });
  }
}

exports.login = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ error: 'No user found' });
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json(user);
    });
  })(req, res, next);
}

exports.logout = (req, res) => {
  req.logout();
  res.json({ message: 'Logged out' });
}