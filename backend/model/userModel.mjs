import { Schema,model } from "mongoose";
 import {createHmac,randomBytes} from "crypto";
 import validator from 'validator';
 import bcrypt from 'bcrypt';

const userSchema=new Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,'message']
    },
    password:{
        type:String,
        required:true,
    },
    salt:{
        type:String,
        required:false,
        unique:true
    }
},{timestamps:true});

userSchema.pre('save',function(next){
     const user=this;
     if(!user.isModified('password')) return next();
     const salt=randomBytes(16).toString("hex");
     const hashedPassword=createHmac("sha256",salt).update(user.password).digest("hex");
     this.password = hashedPassword;
     this.salt=salt;
     next();
});
// userSchema.static('checkUser',async function(email,password){
//    const user=await this.findOne({email});
//    const salt=user.salt;
//    const userPassword=user.password;
    
//     const hashedPassword=createHmac("sha256",salt).update(password).digest("hex");
//     if(userPassword===hashedPassword){
//         return user;
//     }
//     else{
//         console.log("error in logging in")
//     }
// });
userSchema.static('verifyPassword',
async function(password) {
    return await bcrypt.compare(password, this.password);
})

const User=model('userData',userSchema);
export default User;