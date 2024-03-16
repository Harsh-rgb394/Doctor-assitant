import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/UserSlice";

export default function ProtectedRoutes({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // get user
  // eslint-disable-next-line
  const getuser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/userdata",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        <Navigate to="/login" />;
        localStorage.clear();
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();

      console.log(error);
    }
  };
  useEffect(() => {
    if (!user) {
      // if we have not user or not have user data then call this funcion
      getuser();
    }
  }, [user, getuser]);


  if (localStorage.getItem("token")) {
    return children;
  }
  // home page tumhe tabhi dkeha ga jab tumahre pass token hai varna login par direct
  // ho jayge ge
  // token ahi sehde login par he aaoge w r t to login/regsiter page ho
  else {
    return <Navigate to="/login" />;
  }
}
