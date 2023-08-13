const mongoose=require("mongoose");
const colors=require("colors");


const connectdb=async()=>{
    try {
        await mongoose.connect(process.env.Mongodb_URL);
        console.log("connection successfull".bgGreen.red);
        
    } catch (error) {
        console.log("connection failed".bgMagenta.white);
        
    }

}

module.exports= connectdb;