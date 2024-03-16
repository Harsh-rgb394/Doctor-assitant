const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectdb = require("./config/db");
const cors=require("cors");
// const path=require('path');

// intilae and import dotenv file
dotenv.config();

// coonection made up
connectdb();

// port defined
const PORT = process.env.PORT || 5000;
const dev_mode = process.env.dev_mode || "development";

// rest varible
const app = express();


// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// for hosting 
// app.use(express.static(path.join(__dirname,"./client/build")));

// app.get('*',function (_,res){
//   res.sendFile(path.join(__dirname,"./client/build/index.html"),function(err){
//     res.status(500).send(err);

//   })

// })

// routes made now
app.use("/api/v1/user", require("./routes/userRoutes"));
// jab tum login cilck kare goe then api verison user login ya rehister hoga okay and then use cilck karne se kya hoga
// vo controllers decide kareke okay

// routes made now for getting admin users and dcotrs list
app.use("/api/v1/admin", require("./routes/adminroutes"));
// jab tum login cilck kare goe then api verison user login ya rehister hoga okay and then use cilck karne se kya hoga
// vo controllers decide kareke okay

app.use("/api/v1/doctor", require("./routes/doctorRoutes"));
// jab tum login cilck kare goe then api verison user login ya rehister hoga okay and then use cilck karne se kya hoga
// vo controllers decide kareke okay

app.listen(PORT, () => {
  console.log(`server is running  on ${PORT} with ${dev_mode}`.bgMagenta);
});
