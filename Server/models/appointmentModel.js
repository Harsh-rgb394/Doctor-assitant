const mongoose=require("mongoose");

const appointmentSchema=new mongoose.Schema({
    // userId:{
    //     type:String,
    //     required:true
    // },
    // doctorId:{
    //     type:String,
    //     required:true
    // },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',    // Matches mongoose.model('users', ...)
    },    
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctors',  // Matches mongoose.model('doctors', ...)
        required: true
    },
   
    date:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"pending"
    },
    time:{
        type:String,
        required:true
    }
},
{timestamps:true})


const appointmentModel=mongoose.model("appointments",appointmentSchema);

module.exports=appointmentModel