const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModel");
const Doctormodel=require("./../models/Doctormodel");

const getdoctorinfocontroller=async(req,res)=>{
    try {
      console.log(req.body);
        const doctor=await Doctormodel.findById({_id:req.body.doctorId});

        res.status(200).send({
            success:true,
            message:"successfully data fectches",
            data:doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error while showing proifle or fecthin profile"
        })
        
    }

}


const showupdatecontroller=async(req,res)=>{
     console.log(req.body);
    try {
        const doctorupdate=await Doctormodel.findByIdAndUpdate({_id:req.body._id},req.body,{new:true});
        // updating hai pure fields or attrinubtes mein allwo hia 
        if(doctorupdate){
        res.status(200).send({
            success:true,
            message:"successfully get or update the profile",
            data:doctorupdate
        })
      }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"could not get or udpate the profile"
        })
        
    }

}

const bookingavailablecontroller=async(req,res)=>{
    try {
        const bookinfo=await Doctormodel.findOne({userId:req.body.userId});
        res.status(200).send({
            success:true,
            message:"successfully book doctor",
            data:bookinfo
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"cannot book doctor we created",
            error
        })
        
    }

}


const getdoctorappointapproval=async(req,res)=>{
    // try {
    //     const doctor=await Doctormodel.find({userId:req.body.userId})
    //     // doctor ko find kiya hai Doctormodel se wiht userId 
    //     const appointments=await appointmentModel.find({doctorId:req.body.doctorId});
    //     // yeh doctor id user nahijget kare rhae usse mein doctor model se get kar rha hu
    //     // matlab apoointmetns liye doctor ke id ke basias pe 
    //     res.status(200).send({
    //         success:true,
    //         message:"successfully get appointments ",
    //         data:appointments
    //     })
        
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).send({
    //         success:false,
    //         message:"cannot approval of apoointment ",
    //         error
    //     })
        
    // }
    try {
        const doctor = await Doctormodel.findOne({ userId: req.body.userId });
        const appointments = await appointmentModel.find({ doctorId: doctor._id }).populate('doctorId', '_id firstname lastname specialization phone email feesperconsulation');
        res.status(200).send({
          message: "Appointments fetched successfully",
          success: true,
          data: appointments,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "Error fetching appointments",
          success: false,
          error,
        });
      }

}

const handleapppointmentstatus=async(req,res)=>{

    try {
        const { appointmentId, status } = req.body;
        const appointment = await appointmentModel.findByIdAndUpdate(appointmentId, {
          status,
        });
    
        const user = await userModel.findOne({ _id: appointment.userId });
        const notificaton = user.notificaton;
        notificaton.push({
          type: "appointment-status-changed",
          message: `Your appointment status has been ${status}`,
          onClickPath: "/doctor-appointments",
        });
    
        await user.save();
    
        res.status(200).send({
          message: "Appointment status updated successfully",
          success: true
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "Error changing appointment status",
          success: false,
          error,
        });
      }
}


module.exports={getdoctorinfocontroller,showupdatecontroller,bookingavailablecontroller,getdoctorappointapproval,handleapppointmentstatus}