import React from "react";
import Layout from "../components/Layout";
import "./../styles/Layout.css";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import moment from "moment";
import axios from "axios";
import DoctorForm from "../components/DoctorForm";
// ...values is spread the dsta or values as array or also make a temp or another
// array wiht own values like values +user_id array 
const ApplyDoctor = () => {
  // moment is liabry for parsing ,validating for dates
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handlefinish = async (values) => {
    console.log(values.timings);
    // console.log("Formatted Timings:", moment(values.timings[0]).format("HH:mm"), moment(values.timings[1]).format("HH:mm"));
    // console.log("Formatted Timings:", moment(values.timings[0]).toISOString(), moment(values.timings[1]).toISOString());


    const formattedTimings = [
      moment(values.timings[0].toDate()).format("HH:mm"),
  moment(values.timings[1].toDate()).format("HH:mm")
    ];

    // console.log(formattedTimings);

  
   
  
    try {
      dispatch(showLoading);
     
      const res = await axios.post(
        "https://doctor-assitant-backend.onrender.com/api/v1/user/apply-doctor",
        { ...values, userId: user._id,
          timings: formattedTimings
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading);
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading);
      console.log(error);
      message.error("something is wrong");
    }
  };
  return (
    <Layout>

      <DoctorForm handlefinish={handlefinish}/>

    </Layout>
  );
};

export default ApplyDoctor;
