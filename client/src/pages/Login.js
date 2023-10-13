import React from "react";
import { Form, message } from "antd";
import "../styles/RegisterStyle.css";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onfinishHandler = async (values) => {
    // yeh handler fomr ke property meaing isko subimit karete he yeh data bacekdn chala jaege pkay
    // console.log(values);
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      // isse bar bar admin and user ke page ko  bar bar reload nahi karna padega
      dispatch(hideLoading());
      // yaha par success ka matlab dtaa gya succesffully ya data gya kaha gya or kya hua uska
      if (res.data.success) {
        // jo pass keiya hua token localsotrage mein save kardiya deen
        localStorage.setItem("token", res.data.token);
        // jo token aays use localstorage mein save kiya ahi token ke naaam se
        message.success("login succesfulluy");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());

      console.log(error);
      message.error("somethin went wrong");
    }
  };
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register_form"
        >
          <h3 className="heading">Login Please </h3>

          <Form.Item label="Email" name="email" className="items">
            <input type="email" required className="content" />
          </Form.Item>
          <Form.Item label="Password" name="password" className="items">
            <input type="password" required className="content" />
          </Form.Item>
          <Link to="/register" className="direct">
            Not register{" "}
          </Link>

          <button className="btn btn-primary" type="submit">
            {" "}
            Login it
          </button>
        </Form>
      </div>
    </>
  );
};

export default Login;
