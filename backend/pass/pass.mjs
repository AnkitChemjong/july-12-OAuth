import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../model/userModel.mjs';
import dotenv from 'dotenv';
dotenv.config();

passport.use(new LocalStrategy(
    { usernameField: 'email' }, // Specify email as username field
    async (email, password, done) => {
        console.log('Authenticating:', email, password);
        try {
            const user = await User.findOne({ email: email });
            console.log(user);
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            const isMatch = await user.verifyPassword(password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));


passport.use(new GoogleStrategy({
    clientID:process.env.CID,
    clientSecret: process.env.CSECRET,
    callbackURL: "http://localhost:8080/auth/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// Serialize user instance to the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user instance from the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
