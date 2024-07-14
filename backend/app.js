import express from 'express';
import session from 'express-session';
import connect from './connect/connection.mjs';
import userRoute from './route/userRoute.mjs';
import storeDB from './store/mongoStore.mjs';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './pass/pass.mjs';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const store=storeDB(session);
app.use(session({
    secret: 'secret',
    resave:false,
    saveUninitialized:false,
    store:store,
    cookie:{
        maxAge:24*60*60*100
    },
    name:"cook",
}));
app.use(passport.initialize());
app.use(passport.session());
connect(process.env.MONGOURL).then(()=>{
    console.log("Mongo Connected");
}).catch(()=>{console.log("Failed to connect");});

app.use('/',userRoute);
app.get('/him',(req,res)=>{
    if(req.session&&req.session.user){
        res.send(req.session.user);
        
    }
    else{
        res.send("no user")
    }
})
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));
app.get('/auth/callback', 
  passport.authenticate('google', { failureRedirect: '/log' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
app.delete('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error logging out');
        }
        res.clearCookie('cook'); // Replace with your session cookie name if different
        res.send('deleted'); // Redirect to the login page or any other page
    });
});
app.listen(port, () => {
console.log(`app listening on port port:${port}`);
});
