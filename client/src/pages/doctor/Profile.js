import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import axios from 'axios';
import {useParams} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import moment from "moment"



const Profile = () => {
    const {user}=useSelector(state=>state.user);
    const [doctor,setDoctor]=useState(null);
    const paramas=useParams();

    // oncilk button for sending request for udpte or get prfile 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlefinish = async (values) => {
    // console.log(values);
    try {
      dispatch(showLoading);
      const res = await axios.post(
        "/api/v1/doctor/showupdateproifle",
        { ...values, userId: user._id ,
        timings:[
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm")

          ]
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

    const getDoctorinfo=async()=>{
        try {
            const res=await axios.post("/api/v1/doctor/getdoctorinfo",{userId:paramas.id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`

                }
            });

        if(res.data.success){
            setDoctor(res.data.data);
        }
            
        } catch (error) {
            console.log(error);
            message.error("something done wrong")
            
        }
    }

useEffect(()=>{
    getDoctorinfo()
},[])
  return (
    <Layout>
        <h3>Profile</h3>
        {doctor &&(
            // dtat hatota hai apne pass request or conrirller se use lenea 
            <Form layout="vertical" onFinish={handlefinish} className="m-3" initialValues={{
                ...doctor,
                timings:[
                    moment(doctor.timings[0],"HH:mm"),
                    moment(doctor.timings[1],"HH:mm")
                ]
            }}>
            <h5 className="text-left">Personal Details :</h5>
    
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  name="firstname"
                  label="Firstname"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="enter your name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  name="lastname"
                  label="Lastname"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="enter your lastname" />
                </Form.Item>
              </Col>
    
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  name="phone"
                  label="Phone"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="enter your phone" />
                </Form.Item>
              </Col>
    
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  name="email"
                  label=" Email"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="enter your email" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  name=" website"
                  label="website"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="enter your wesite name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  name="address"
                  label=" Address"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="enter your address" />
                </Form.Item>
              </Col>
            </Row>
    
            <h5 className="text-left">Professional Details :</h5>
    
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  name="specialization"
                  label="Specialization"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="enter your specialization" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  name="experience"
                  label="Experience"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="enter your experience" />
                </Form.Item>
              </Col>
    
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  name="feesperconsulation"
                  label="Feesperconsulation"
                  required
                  rules={[{ required: true }]}
                >
                  <Input
                    type="text"
                    placeholder="enter your phone feesperconsulation"
                  />
                </Form.Item>
              </Col>
    
              <Col xs={24} md={24} lg={8}>
                <Form.Item name="timings" label="Timings" required>
                  <TimePicker.RangePicker format="HH:mm" />
                </Form.Item>
              </Col>
    
              <Col xs={24} md={24} lg={8}></Col>
              <Col xs={24} md={24} lg={8}>
                <button className="btn btn-primary from-btn">Update</button>
              </Col>
            </Row>
          </Form>

        )} 
        </Layout>
  )
}

export default Profile