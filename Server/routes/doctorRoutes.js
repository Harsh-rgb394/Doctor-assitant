const express=require("express");
const authMiddleware =require("../middlewares/authMiddleware");
const {getdoctorinfocontroller,showupdatecontroller,bookingavailablecontroller,getdoctorappointapproval,handleapppointmentstatus}=require("../controllers/Doctorctrl")


const router=express.Router();
// for getting docroe profile roter 
router.post("/getdoctorinfo",authMiddleware,getdoctorinfocontroller);

// for updating or showing the doctor prifle 
router.post("/showupdateproifle",authMiddleware,showupdatecontroller);4


// for fetching the  routes or doctors by id or book info what we creted doctor
// and book them wiht fees time avilabe ly 
router.post("/bookingavailable",authMiddleware,bookingavailablecontroller);

router.get("/getdoctorapproval",authMiddleware,getdoctorappointapproval);
// gettig aprrovala and all appoitments 


router.post("/appointmentstatus",authMiddleware,handleapppointmentstatus);


module.exports=router