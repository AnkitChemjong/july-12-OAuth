import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../model/userModel.mjs';
import dotenv from 'dotenv';
dotenv.config();

passport.use(new GoogleStrategy({
    clientID:process.env.CID,
    clientSecret: process.env.CSECRET,
    callbackURL: "http://localhost:8080/auth/callback",
    passReqToCallback:true,
    scope:['email','profile']
  },
 async function(request,accessToken, refreshToken, profile, cb) {
    // const user=User.findOne({ userId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    let user=await User.findOne({ userId: profile.id });
    if(!user){
       user=await User.create({userId:profile.id,userName:profile._json.name,email:profile._json.email,password:profile.id});
       return cb(null, user);
    }
    else
    {

        return cb(null, user);
    }

    console.log(profile.id)
    console.log(profile._json.email)
    console.log(profile._json.picture)
    console.log(profile._json.name)
  }
));

// Serialize user instance to the session
passport.serializeUser((user, done) => {
    //console.log(user);
    done(null, user.userId);
});

// Deserialize user instance from the session
passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ userId: id });
      done(null, user);
    } catch (err) {
      done(err);
    }
  });