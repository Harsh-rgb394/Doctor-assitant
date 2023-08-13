const express=require("express");

const { getAllUserController, getAllDoctorsController,getapprovalcontroller } = require("../controllers/Adminctrl");
const authMiddleware =require("../middlewares/authMiddleware");


const router=express.Router();


// for getting router all getting for users 
router.get("/getAllUsers",authMiddleware,getAllUserController);

// for getting router all getting for doctors
router.get("/getAllDoctors",authMiddleware,getAllDoctorsController);

// for getting approval of doctor 
router.post("/getapprovaldoctor",authMiddleware,getapprovalcontroller);


module.exports=router