import React from "react";
import { Form, message } from "antd";
import styles from "../styles/RegisterStyle.module.css";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// for newtork call
// Axios works by making HTTP requests with NodeJS and XMLHttpRequests on the browser
// equest was successful, you will receive a response with the data requested. If the request failed, you will get an error.

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onfinishHandler = async (values) => {
    // ek bar regsiter hone ke baad dricet to lgin page
    // yeh handler fomr ke property meaing isko subimit karete he yeh data bacekdn chala jaege pkay
    // console.log(values);
    try {
      dispatch(showLoading());
      const res = await axios.post("http://localhost:5000/api/v1/user/register", values);
      dispatch(hideLoading());
      // ifvalues scueedfuly gaye hai ya nahii so
      if (res.data.success) {
        message.success("register successfulyy");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());

      console.log(error);
      message.error("something wrong");
    }
  };
  return (
    <>
      <div className={styles.formcontainer}>
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className={styles.registerform}
        >
          <h3 className={styles.heading}>Register Please</h3>
          {/* label jo dekhte ahi and name jo backend mein save hai  */}
          <Form.Item label="Name" name="name" >
            <input type="text" required className={styles.content} />
          </Form.Item>
          <Form.Item label="Email" name="email" >
            <input type="email" required className={styles.content} />
          </Form.Item>
          <Form.Item label="Password" name="password" >
            <input type="password" required className={styles.content} />
          </Form.Item>
          <Link to="/login" className={styles.direct}>
            Already register{" "}
          </Link>

          <button className={styles.btn} type="submit">
            {" "}
            Register it
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;
