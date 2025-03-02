
import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register"
import { useSelector } from "react-redux";
import SPINER from "./components/SPINER";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotifcationPage from "./pages/NotifcationPage";
import Doctors from "./pages/Admin/Doctors";
import Users from "./pages/Admin/Users";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointment from "./pages/doctor/DoctorAppointment";


  {/* <div className="bg-dark">
    {/* text-success" indicates color is green   */}
      {/* <h1 className="text-success">Hello</h1></div></> */} 

function App() {
  // useSelector se apne laoding ke state ko grab karneg 
  const {loading}=useSelector(state=>state.alerts)
  return (
    <>
    <BrowserRouter>
    {/* if false then go to spinner means state jo hai ladiing flase hai okya 
    if not got to route  */}
    {loading ? (<SPINER/>):(
       <Routes>

       
       <Route path="/apply-doctor" element={<ProtectedRoutes><ApplyDoctor/></ProtectedRoutes>
       
      }/>
      <Route path="/admin/doctors" element={<ProtectedRoutes><Doctors/></ProtectedRoutes>
       
      }/>

       <Route path="/admin/users" element={<ProtectedRoutes><Users/></ProtectedRoutes>
       
      }/>
      <Route path="/doctor/profile" element={<ProtectedRoutes><Profile/></ProtectedRoutes>
       
      }/>
       <Route path="/doctor/appointments/:doctorId" element={<ProtectedRoutes><BookingPage/></ProtectedRoutes>
       
      }/>
      <Route path="/notification" element={<ProtectedRoutes><NotifcationPage/></ProtectedRoutes>
       
      }/>
     
       <Route path="/login" element={<PublicRoute><Login/></PublicRoute>
       
       }/>

       <Route path="/register" element={
        <PublicRoute>
           <Register/>
        </PublicRoute>
      
       }/>
       <Route path="/appointments" element={<ProtectedRoutes><Appointments/></ProtectedRoutes>
       
      }/>
       <Route path="/doctor-appointments" element={<ProtectedRoutes><DoctorAppointment/></ProtectedRoutes>
       
      }/>
       <Route path="/" element={<ProtectedRoutes><HomePage/></ProtectedRoutes>
       
      }/>
 
       
       </Routes>

    ) }
   </BrowserRouter>
    </>
  
   
  );
}

export default App;
