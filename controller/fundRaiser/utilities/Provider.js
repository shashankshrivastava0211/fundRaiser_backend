const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/User");

const connectPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "23417507603-13kq006u1riaat1vsk5t3ild26lolhub.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:4000/api/auth/google",
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const user = await User.findOne({ googleId: profile.id });

          if (!user) {
            const newUser = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
            });
            return done(null, newUser);
          } else {
            return done(null, user);
          }
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  passport.initialize();
};

module.exports = connectPassport;
