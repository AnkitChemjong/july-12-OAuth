import {Router} from 'express';
import createUser from '../controller/createUser.mjs';
import logInUser from '../controller/logInUser.mjs';
import passport from 'passport';


const userRoute=Router();
userRoute.route('/').post(createUser);
userRoute.post('/log',passport.authenticate('local'),(req,res)=>{
    res.send(req.user);
});

export default userRoute;