const Doctormodel=require("./../models/Doctormodel");
const userModel=require("./../models/userModel");

const getAllUserController=async(req,res)=>{
    try {

        const users=await userModel.find({});
        // get all info or data 
        res.status(200).send({
            success:true,
            message:"users data",
            data:users
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"could not get users",
            error
        })
        
    }

}

const getAllDoctorsController=async(req,res)=>{
    try {

        const docte=await Doctormodel.find({});
        // get all info or data 
        res.status(200).send({
            success:true,
            message:"doctors  data",
            data:docte,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"could not get doctors data"
        })
        
    }
    
}

const getapprovalcontroller=async(req,res)=>{
    try {
        // user se uka ida and satus got get karek 
        const {doctorId,status}=req.body;
        // comes from react frontend we just break it 
        const doctor=await Doctormodel.findByIdAndUpdate(doctorId,{status})
        // change akrna hai islye ase object pass karna hia 
        const user=await userModel.findOne({_id:doctor.userId})
        const notificaton=user.notificaton;
        notificaton.push({
            type:"doctor-account-request-updated",
            message:`your apply doctor request has been ${status}`,
            onClickPath:"/notification"
        })


        user.isDoctor=status==="approved"?true:false
        // isdcore ke filed db mein use update kiya hia 
        await user.save();
        res.status(200).send({
            success:true,
            message:"apply-doctor request approved",
            data:doctor
        })

    } catch (error) {
        console.log(error);
        res.statu(500).send({
            success:false,
            message:"could not approval of doctors",
            error
        })
        
    }

}


module.exports={getAllUserController,getAllDoctorsController,getapprovalcontroller}