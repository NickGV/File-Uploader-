const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function initialize(passport) {
  const authenticateUser = async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { username } });

      if (!user) return done(null, false, { message: 'No user found' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: 'Invalid password' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
}

module.exports = initialize;
