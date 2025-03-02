import React, { useState } from "react";
import { Form,Button, Col, Input, Row, TimePicker } from "antd";
import styles from "../styles/ApplyDoctor.module.css"
import moment from "moment";

const DoctorForm=({handlefinish,initialValues})=>{
  // const [curretstep,setcurrentstep]=useState(1);
  const [form]=Form.useForm();

    return(
        <>
        <div className="">
        <div className={styles.formcontainer}>
  <Form
    layout="vertical"
    onFinish={handlefinish}
    initialValues={{
      ...initialValues,
      ...(initialValues && {
        timings: [
          moment(initialValues?.timings[0], "HH:mm"),
          moment(initialValues?.timings[1], "HH:mm"),
        ],
      }),
    }}
  >

<div className={styles.formRow}>
          {/* Left Side - Personal Information */}
          <div className={styles.formSection}>
            <h1 className={styles.cardTitle}>Personal Information</h1>
            <Form.Item label="First Name" name="firstname" rules={[{ required: true }]}>
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item label="Last Name" name="lastname" rules={[{ required: true }]}>
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item label="Phone Number" name="phone" rules={[{ required: true }]}>
              <Input placeholder="Phone Number" />
            </Form.Item>
            <Form.Item label="Website" name="website" rules={[{ required: true }]}>
              <Input placeholder="Website" />
            </Form.Item>
            <Form.Item label="Address" name="address" rules={[{ required: true }]}>
              <Input placeholder="Address" />
            </Form.Item>
          </div>

          {/* Right Side - Professional Information */}
          <div className={styles.formSection}>
            <h1 className={styles.cardTitle}>Professional Information</h1>
            <Form.Item label="Specialization" name="specialization" rules={[{ required: true }]}>
              <Input placeholder="Specialization" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item label="Experience" name="experience" rules={[{ required: true }]}>
              <Input placeholder="Experience" type="number" />
            </Form.Item>
            <Form.Item label="Fee Per Consultation" name="feesperconsulation" rules={[{ required: true }]}>
              <Input placeholder="Fee Per Consultation" type="number" />
            </Form.Item>
            <Form.Item label="Timings" name="timings" rules={[{ required: true }]}>
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </div>
        </div>

        {/* Submit Button - Centered Below */}
        <div className={styles.buttonContainer}>
          <Button type="primary" htmlType="submit" className={styles.btnclass}>
            Submit
          </Button>
        </div>
      
  </Form>
</div>
  
        </div>
        </>
    )
}


export default DoctorForm;