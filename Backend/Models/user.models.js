const mongoose = require("mongoose");
const jwt=require("jsonwebtoken")
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: [3, "First Name must be at least 3 Characters long"],
  },
  Lastname: {
    type: String,
    minlength: [3, "First Name must be at least 3 Characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
     },
     password:{
    type:String,
    required:true,
    select:false,
  },socketId:{
    type:String
  }
});
userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET)
    return Token;
}
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.comapre(password,this.password);
}
userSchema.static.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}
const UserModel=mongoose.model('User',userSchema);
module.exports=UserModel;