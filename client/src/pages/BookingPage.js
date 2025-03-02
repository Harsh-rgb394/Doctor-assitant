import React from 'react'
import Layout from '../components/Layout'
import { useState } from 'react';
import axios from "axios"
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DatePicker, TimePicker, message } from 'antd';
import moment from 'moment';
import "./../styles/Booking.css"
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const BookingPage = () => {
    const {user}=useSelector((state)=>state.user)
    const params=useParams();
    const [doctors,setDoctors]=useState([]);
    // console.log(doctors);
    const [date,setDate]=useState();
    const [time,setTime]=useState();
    const [available,setAvailable]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();


    // console.log(user._id);
    

    
  
    

   

    const userdata=async()=>{
      // cleint se token genertate kar diya and ha/getlistdoctorsi usse backend or server saide bheja ahia 
      try {
        const res=await axios.post("https://doctor-assitant-backend.onrender.com/api/v1/doctor/getdoctorinfo",{
            doctorId:params.doctorId
        },{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        })
        
  
      if(res.data.success){
        setDoctors(res.data.data);
      }
      } catch (error) {
        console.log(error);
      }
  
    }


  // for checkavality bity 
  const checkavalable=async()=>{
    try {
      dispatch(showLoading());
      const res=await axios.post("https://doctor-assitant-backend.onrender.com/api/v1/user/appointment-available",{
        doctorId:params.doctorId,
        date:date,
        time:time
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })

    dispatch(hideLoading());
    if(res.data.success){

      message.success(res.data.message);
      setAvailable(true);

    }
    else{
      message.error(res.data.message);
    }

      
    } catch (error) {
      console.log(error);
      message.error("error while checking availiblity");
      dispatch(hideLoading);
      
    }
  }



    // for booking 

    const handlebooking=async()=>{
      try {
        setAvailable(false);
       
        dispatch(showLoading());
        const response = await axios.post(
          "https://doctor-assitant-backend.onrender.com/api/v1/user/book-appointment",
          {
            doctorId: params.doctorId,
            userId: user._id,
            doctorInfo: doctors,
            userInfo: user,
            date: date,
            time: time,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        dispatch(hideLoading());
        if (response.data.success) {
          
          message.success(response.data.message)
          navigate('/appointments')
        }
      } catch (error) {
        message.error("Error booking appointment");
        dispatch(hideLoading());
      }
      // try {
      //     dispatch(showLoading());
      //     const res=await axios.post("/api/v1/user/bookappointment",{
      //         doctorId:params.doctorId,
      //         userId:user._id,
      //         doctorInfo:doctors,
      //         date:date,
      //         userInfo:user,
      //         time:time,
      //     },
      //     {
      //         headers:{
                     
      //                  Authorization:`Bearer${localStorage.getItem("token")}`
      //             }
      //     })
      //     dispatch(hideLoading());
      //     if(res.data.success){
      //         message.success(res.data.message);
      //     }

          
      // } catch (error) {
      //     // dispatch(showLoading);
      //     dispatch(hideLoading());
      //     console.log(error);
                      
      // }
  }
  
  
    useEffect(()=>{
      userdata();
    },[])
  return (
    <Layout>

<div className='booking-container'>
            {doctors && (
                <div className='doctor-details'>
                    <h2 className='doctor-name'>Dr. {doctors.firstname} {doctors.lastname}</h2>
                    <h4 className='doctor-info'>Fees: ₹{doctors.feesperconsulation}</h4>
                    {doctors.timings && (

                        <h4 className='doctor-info'>Timings: {doctors.timings[0]} - {doctors.timings[1]}</h4>

                    )}
                    {/* <h4 className='doctor-info'>Timings: {doctors.timings[0]} - {doctors.timings[1]}</h4> */}

                    <div className='booking-form'>
                        <DatePicker
                            format="DD-MM-YYYY"
                            className="booking-input"
                            onChange={(value) => {
                                setDate(moment(value).format("DD-MM-YYYY"));
                                setAvailable(false);
                            }}
                        />
                        <TimePicker
                            format="HH:mm"
                            className="booking-input"
                            onChange={(value) => {
                                setAvailable(false);
                                setTime(moment(value.toISOString()).format("HH:mm"));
                            }}
                        />

                        {!available && (
                            <button className='btn check-btn' onClick={checkavalable}>
                                Check Availability
                            </button>
                        )}
                        {!available && (
                            <button className='btn book-btn' onClick={handlebooking}>
                                Book Now
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
      </Layout>
  )
}

export default BookingPage