import React from "react";
import { Form, message } from "antd";
import styles from "../styles/RegisterStyle.module.css";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  // const {user}=useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const onfinishHandler = async (values) => {
    // yeh handler fomr ke property meaing isko subimit karete he yeh data bacekdn chala jaege pkay
    // console.log(values);
    try {
      dispatch(showLoading());
      const res = await axios.post("https://doctor-assitant-backend.onrender.com/api/v1/user/login", values);
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
      <div className={styles.formcontainer}>
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className={styles.registerform}
        >
          <h3 className={styles.heading}>Login Please </h3>

          <Form.Item label="Email" name="email" >
            <input type="email" required className={styles.content} />
          </Form.Item>
          <Form.Item label="Password" name="password" >
            <input type="password" required className={styles.content} />
          </Form.Item>
          <Link to="/register" className={styles.direct}>
            Not register{" "}
          </Link>

          <button className={styles.btn} type="submit">
            {" "}
            Login it
          </button>
        </Form>
      </div>
    </>
  );
};

export default Login;
