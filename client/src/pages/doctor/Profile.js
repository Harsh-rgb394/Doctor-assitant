import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import axios from 'axios';
// import {useParams} fr/om "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import moment from "moment"
import "../../styles/Profile.css"
import DoctorProfile from '../../components/DoctorProfile';


const Profile = () => {
    const {user}=useSelector(state=>state.user);
    const [doctor,setDoctor]=useState(null);
    const [isediting,setediting]=useState({});
    const [updatedata,setupdatedata]=useState(null);
    // const paramas=useParams();
    console.log(updatedata);

    // oncilk button for sending request for udpte or get prfile 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onEditProfile = async (values) => {
    // console.log(values);
    try {
      dispatch(showLoading);
      const res = await axios.post(
        "http://localhost:5000/api/v1/doctor/showupdateproifle", updatedata,
      
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading);
      if (res.data.success) {
        setDoctor(res.data.data);
        setediting({});
        message.success(res.data.message);
        // navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading);
      console.log(error);
      message.error("something is wrong");
    }
  };

    const getDoctorinfo=async()=>{
        try {
            const res=await axios.post("http://localhost:5000/api/v1/doctor/bookingavailable",{userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`

                }
            });

        if(res.data.success){
            setDoctor(res.data.data);
            setupdatedata(res.data.data);
        }
            
        } catch (error) {
            console.log(error);
            message.error("something done wrong")
            
        }
    }

useEffect(()=>{
    getDoctorinfo()
    //  eslint-disable-next-line
},[])

const handleEditClick = (field) => {
  setediting({ ...isediting, [field]: true });
};

// Handle input change
const handleInputChange = (field, value) => {
  setupdatedata({ ...updatedata, [field]: value });
};


const renderField = (field, label) => (
  <div className="profile-row">
      <span className="label">{label}:</span>
      {isediting[field] ? (
          <input
              type="text"
              value={updatedata[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              onBlur={() => setediting({ ...isediting, [field]: false })}
              autoFocus
          />
      ) : (
          <span className="value" onClick={() => handleEditClick(field)}>
              {updatedata[field] || 'N/A'}
          </span>
      )}
  </div>
);

  return (
    <Layout>
        {doctor &&(
            // dtat hatota hai apne pass request or conrirller se use lenea 
            // <DoctorForm handlefinish={handlefinish} />
            // <DoctorProfile doctor={doctor} onEditProfile={onEditProfile}/>
            <div className="profile-container">
            <div className="profile-card">
                {/* <div className="profile-header">
                    <h2>Doctor Profile</h2>
                </div> */}

                {/* Personal Information */}
                <div className="profile-section">
                    <h3>Personal Information</h3>
                    {renderField('firstname', 'First Name')}
                    {renderField('lastname', 'Last Name')}
                    {renderField('specialization', 'Specialization')}
                    {renderField('experience', 'Experience (years)')}
                    {renderField('feesperconsulation', 'Fees Per Consultation')}
                    <div className="profile-row">
                        <span className="label">Status:</span>
                        <span className={`status-badge ${doctor.status}`}>{doctor.status}</span>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="profile-section">
                    <h3>Contact Information</h3>
                    {renderField('phone', 'Phone')}
                    {renderField('email', 'Email')}
                    {renderField('website', 'Website')}
                    {renderField('address', 'Address')}
                </div>

                {/* Timings Section */}
                <div className="profile-section">
                    <h3>Timings</h3>
                    <div className="timings-grid">
                        {doctor.timings?.map((time, index) => (
                            <div
                                key={index}
                                className="timing-slot"
                                onClick={() => handleEditClick(`timings[${index}]`)}
                            >
                                {isediting[`timings[${index}]`] ? (
                                    <input
                                        type="text"
                                        value={updatedata.timings[index] || ''}
                                        onChange={(e) => {
                                            const newTimings = [...updatedata.timings];
                                            newTimings[index] = e.target.value;
                                            setupdatedata({ ...updatedata, timings: newTimings });
                                        }}
                                        onBlur={() => setediting({ ...isediting, [`timings[${index}]`]: false })}
                                        autoFocus
                                    />
                                ) : (
                                    time
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Save Button */}
                <div className="save-btn-container">
                    <button className="save-button" onClick={onEditProfile}>Save Changes</button>
                </div>
            </div>
        </div>
            

        )} 
        </Layout>
  )
}

export default Profile