const express=require("express");
const { Logincontroller, Registercontroller,authController,applyDoctorController,getallnotify,deleteallnotify,getlistdoctorscontroller,bookappointmentcontroller,getallappointmentcontroller,bookappointavailablecontroller} = require("../controllers/userCntrl");
const authMiddleware =require("../middlewares/authMiddleware");

const router=express.Router();

// LOGIN POST ROUTER 
router.post("/login",Logincontroller);

// REGSITER POST ROUTER s
router.post("/register",Registercontroller);

// auht middlware or route 
router.post("/userdata",authMiddleware,authController);

// for saving doctor info or data 
router.post("/apply-doctor",authMiddleware,applyDoctorController);


// for applting docor and get notifcaton  
router.post("/get-all-notification",authMiddleware,getallnotify);

// for deleting the doctor request or notifcaton  
router.post("/delete-all-notification",authMiddleware,deleteallnotify);


// get all doctors books list aply dcotr list 
router.get("/getlistdoctors",authMiddleware,getlistdoctorscontroller);


// router for geet or book the appointmetn for doctor we created by user 
router.post("/book-appointment",authMiddleware,bookappointmentcontroller);

// router for availabily of boooking the doctor 
router.post("/appointment-available",authMiddleware,bookappointavailablecontroller);

// router for get all appintmetns list 
router.get("/get-all-book-appointment",authMiddleware,getallappointmentcontroller);


module.exports=router;