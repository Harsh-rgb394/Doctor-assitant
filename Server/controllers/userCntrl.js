const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const Doctormodel = require("../models/Doctormodel");
const moment = require("moment");
const appointmentModel = require("../models/appointmentModel");
// for password encrytion ,decruytion ,
// Authentication verifies the identity of a user or service, and authorization determines their access rights.

const Logincontroller = async (req, res) => {
  try {
    const existuse = await userModel.findOne({ email: req.body.email });
    if (!existuse) {
      res.status(200).send({ message: "user does not exist", success: false });
    }
    const comapredpassword = await bcrypt.compare(
      req.body.password,
      existuse.password
    );
    if (!comapredpassword) {
      res
        .status(200)
        .send({ message: "password doesnot match ", success: false });
    }

    // after successfulyy login wiht email and password we generate token
    const token = jsonwebtoken.sign(
      { id: existuse._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res
      .status(200)
      .send({ message: "user login successfully", data:existuse,success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "cannot login" });
  }
};

// register working
const Registercontroller = async (req, res) => {
  try {
    const existuser = await userModel.findOne({ email: req.body.email });
    if (existuser) {
      res
        .status(201)
        .send({ message: "user already regsiter", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    req.body.password = hashedpassword;
    const newuser = new userModel(req.body);
    await newuser.save();
    res.status(200).send({ message: "register succesfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "cannot register" });
  }
};

// auth controller
const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
  
    user.password = undefined;
    if (!user) {
      res.status(404).send({
        message: "user already exist",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
    });
  }
};

// applydcotrcontorller
const applyDoctorController = async (req, res) => {
  try {
    // console.log(req.body);
    const newdoctor = await Doctormodel(req.body);
    // yaha par status ko type nahi kar sakte i mean user so ase direct diya wiht
    // db operations wiht spereading ...req.body so that it cant overlap ohter properties tgen type pendfding
    // thats why requred await
    await newdoctor.save();
    // we need to notdiy admin that request coming or aply docto is filled
    // and we get admin okay
    const adminuser = await userModel.findOne({ isAdmin: true });
    // const notificaton = adminuser.notificaton;
    // notidcaton ke aarya mein notdicaron ko psuh ckanrhe
    // notificaton.push({
    //   type: "apply-doctor-request",
    //   // kon request bhej rahe ahi
    //   message: `${newdoctor.firstname} ${newdoctor.lastname} has booked for doctor account`,
    //   data: {
    //     doctorId: newdoctor._id,
    //     name: newdoctor.firstname + " " + newdoctor.lastname,
    //     onClickPath: "/admin/doctors",
    //   },
    // });
    // await userModel.findByIdAndUpdate(adminuser._id, { notificaton });
    // await adminuser.save();
    const updatedadmin=await userModel.findByIdAndUpdate(adminuser._id,{
      $push:{notificaton:{
        type: "apply-doctor-request",
      // kon request bhej rahe ahi
      message: `${newdoctor.firstname} ${newdoctor.lastname} has booked for doctor account`,
      data: {
        doctorId: newdoctor._id,
        name: newdoctor.firstname + " " + newdoctor.lastname,
        onClickPath: "/admin/doctors",
      },
      },
    },

    
    
    },{ new: true }
    )
    // update karna tha to id udpate hoga so update with id 
    // mere hissab se admin users honge bahut but mein jisee admin ke notificatiion update karna chata hu uske id mene then update kiya 8
    res.status(201).send({
      success: true,
      message: "doctor request has been applied",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while applying a doctor",
    });
  }
};

// get all notficaton for appplied dcotro or applied doctro
const getallnotify = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password=undefined;
    const notificaton = user.notificaton;
    
    // so findbyidanduapdate and findbyoneandudpate these directly save in db not saved again { new: true } so we need to save it again
    const updatedUser = await userModel.findByIdAndUpdate(
        user._id,
        {
            $push: { seennotification: { $each: notificaton } },
            $set: { notificaton: [] }
        },
        { new: true } // Returns the updated document
    );
    // seennotification.push(...notificaton);
    // user.notificaton = [];
    // user.seennotification = notificaton;
    // const udpateduser = await user.save();
    res.status(200).send({
      success: true,
      messsage: "get notifcation successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error get notificaton",
    });
  }
};

const deleteallnotify = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    // user.notificaton = [];
    // user.seennotification = [];
    
    const udpateduser=await userModel.findByIdAndUpdate(user._id,{
      $set:{notificaton:[],seennotification:[]}
    },
    {
      new:true
    }
    )
    udpateduser.password = undefined;
    // const udpatedusers = await user.save();
    res.status(200).send({
      success: true,
      message: "notifcation deleted successfully",
      
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "cannot delete the notifications",
    });
  }
};

// get all book or apply doctor list
const getlistdoctorscontroller = async (req, res) => {
  try {
    const listdata = await Doctormodel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "successfully get doctor list",
      data: listdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "could not get list doctors",
      error,
    });
  }
};

const bookappointmentcontroller = async (req, res) => {
  try {
    req.body.status = "pending";
    // console.log(req.body.doctorInfo);
    // console.log(req.body.userInfo);
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    //pushing notification to doctor based on his userid
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notificaton.push({
      type: "new-appointment-request",
      message: `A new appointment request has been made by ${req.body.userInfo.name}`,
      onClickPath: "/doctor/appointments",
    });
    await user.save();
    res.status(200).send({
      message: "Appointment booked successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
};

const getallappointmentcontroller = async (req, res) => {
  try {
    console.log(req.body.userId);
    // const appointments = await appointmentModel.find({
    //   userId: req.body.userId,
    // });
    const appointments = await appointmentModel.find({ userId:req.body.userId })
            .populate('doctorId', '_id firstname lastname specialization phone email feesperconsulation');

    console.log(appointments);
    res.status(200).send({
      success: true,
      message: "successfully get appointments",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "cannot get appointments",
    });
  }
};

// const bookappointavailablecontroller=async(res,req)=>{
//     try {
//         const date=moment(req.body.date,"DD-MM-YYYY").toISOString();
//         const fromtime=moment(req.body.time,"HH:mm").subtract(1,"hours").toISOString();
//         const totime=moment(req.body.time,"HH:mm").add(1,"hours").toISOString();

//         const doctorId = req.body.doctorId;
//         const appointments=await appointmentModel.find({doctorId,date,time:{ $gte: fromtime, $lte: totime }
//             // this is says grater to lessthan the time like $gte greater se $lte smaller se
//         })
//         if (appointments.length > 0) {
//              res.status(200).send({
//               message: "Appointments not available",
//               success: false,
//             });
//           } else {
//              res.status(200).send({
//               message: "Appointments available",
//               success: true,
//             });
//           }

//     } catch (error) {
//         console.log(error);
//          res.status(500).send({
//           message: "Error booking appointment",
//           success: false,
//           error,
//         });

//     }

// }

const bookappointavailablecontroller = async (req, res) => {
  try {
    console.log(req.body);
    const doctor=await Doctormodel.findById(req.body.doctorId);
    // first find the doctor for timgins getting 
    if(!doctor){
      return res.status(400).send({
        message: "Doctor not found",
        success: false,
      });
    }

    // selecting the time from req.body for crearinf the window and checking lie into range or not of timings 

    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const selectedtime=moment(req.body.time,"HH:mm");

    const fromTime = moment(selectedtime, "HH:mm")
      .subtract(1, "hours")
      .toISOString();

    const toTime = moment(selectedtime, "HH:mm").add(1, "hours").toISOString();

    const startime=moment(doctor.timings[0],"HH:mm");
    const endtime=moment(doctor.timings[1],"HH:mm");

    if(!selectedtime.isBetween(startime,endtime,undefined,"[]")){
      return res.status(400).send({
        message: "time is outside doctors availability",
        success: false,
      });
    }

    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: { $gte: fromTime, $lte: toTime },
    });

    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not available",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Appointments available",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
};

module.exports = {
  Logincontroller,
  Registercontroller,
  authController,
  applyDoctorController,
  getallnotify,
  deleteallnotify,
  getlistdoctorscontroller,
  bookappointmentcontroller,
  getallappointmentcontroller,
  bookappointavailablecontroller,
};
