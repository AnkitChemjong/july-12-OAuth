import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../model/userModel.mjs';
import dotenv from 'dotenv';
dotenv.config();

// passport.use(new LocalStrategy(
//     { usernameField: 'email' }, // Specify email as username field
//     async (email, password, done) => {
//         console.log('Authenticating:', email, password);
//         try {
//             const user = await User.findOne({ email: email });
//             console.log(user);
//             if (!user) {
//                 return done(null, false, { message: 'Incorrect email?' });
//             }
//             const isMatch = await user.verifyPassword(password);
//             if (!isMatch) {
//                 return done(null, false, { message: 'Incorrect password?' });
//             }
//             return done(null, user);
//         } catch (err) {
//             return done(err);
//         }
//     }
// ));
passport.use(new LocalStrategy(
    {usernameField: 'email'},
    async function(email, password, done) {
      try {
        const user = await User.findOne({ email:email });
        //console.log(user);
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
  
        const isMatch = await user.verifyPassword(password);
        console.log(isMatch);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }
  
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));


// Serialize user instance to the session
passport.serializeUser((user, done) => {
    done(null, user.userId);
});

// Deserialize user instance from the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.find({userId: id});
        console.log(user);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
