import User from '../model/userModel.mjs';



const createUser =async (req,res) =>{
try{

    const {email,password}=req.body;
    const result=await User.checkUser(email,password);
    req.session.user=result;
    res.send("user loggin"+result);
   
}
catch(err){
    res.send("error in logging the user"+err);
}

}

export default createUser;