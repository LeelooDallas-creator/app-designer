// config/passport.js
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        // Vérifie si l'utilisateur existe
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "Utilisateur inconnu" });
        }

        // Compare le mot de passe avec le hash
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
          return done(null, false, { message: "Mot de passe incorrect" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  // Sérialisation / désérialisation
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
