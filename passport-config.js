const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await getUserByEmail(email); // Await the promise from getUserByEmail
      if (!user) {
        return done(null, false, { message: 'No user with that email' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
      
    } catch (e) {
      return done(e);
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id ));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id); // Await the promise from getUserById
      done(null, user);
    } catch (e) {
      done(e, null);
    }
  });
}

module.exports = initialize;
