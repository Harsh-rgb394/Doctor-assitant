import React from "react";
import Layout from "../components/Layout";
import "./../styles/Layout.css";

import { Form, Row, Col, Input, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
// ...values is spread the dsta or values as array or also make a temp or another
// array wiht own values like values +user_id array 
const ApplyDoctor = () => {
  // moment is liabry for parsing ,validating for dates
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlefinish = async (values) => {
    // console.log(values);
    try {
      dispatch(showLoading);
      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        { ...values, userId: user._id },
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
      <h1 className="text-center">Apply Doctor</h1>

      <Form layout="vertical" onFinish={handlefinish} className="m-3">
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
            <Form.Item
              name="timings"
              label="Timings"
              required
              className="timing"
            >
              <TimePicker.RangePicker format="HH:mm" className="boxx" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary from-btn">Submit</button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
