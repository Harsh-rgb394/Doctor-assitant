const mongoose =require("mongoose");


const Doctorschema=new mongoose.Schema({
    userId:{
        type:String
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    website:{
        type:String,
        
    },
    address:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    feesperconsulation:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    },
    timings:{
        type:Object,
        required:true
    },




},
 {timestamps:true}
 );

const Doctormodel=mongoose.model("doctors",Doctorschema);
module.exports=Doctormodel;