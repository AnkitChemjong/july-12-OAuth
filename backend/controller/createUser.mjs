import User from '../model/userModel.mjs';
import {v4 as uuidv4} from 'uuid';


const createUser =async (req,res) =>{
try{

    const {userName,email,password}=req.body;
    const userId=uuidv4();
    if(!userName||!email||!password){
      res.send("please provide credentials");
  
    }
    const newUser=await User.create({userId,userName,email,password});
    res.send("New user is created"+newUser);
}
catch(err){
    res.send("error in creating the user"+err);
}

}

export default createUser;