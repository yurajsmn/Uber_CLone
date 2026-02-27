const { default: mongoose } = require('mongoose');
const moongose=require('mongoose')
const blacklistTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    CreatedAt:{
        type:Date,
        default:Date.now,
        expires:8640
    }
});
module.exports=mongoose.model('blacklistToken',blacklistTokenSchema);