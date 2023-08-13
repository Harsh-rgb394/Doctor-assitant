const mongoose=require("mongoose");
// const Schema=mongoose.Schema;

const userSchema=new mongoose.Schema({
    name:{type:String,require:true},
    email : { type: String, require: true, unique: true },
    password:{type:String,require:true},
    isAdmin:{type:Boolean,default:false},
    isDoctor:{type:Boolean,default:false},
    notificaton:{type:Array,default:[]},
    seennotification:{type:Array,default:[]}
})

const userModel=mongoose.model("users",userSchema);
module.exports=userModel