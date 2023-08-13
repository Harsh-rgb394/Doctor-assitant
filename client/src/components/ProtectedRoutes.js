import React ,{useEffect}from 'react'
import { Navigate } from 'react-router-dom';
import axios from "axios"
import {useSelector,useDispatch} from "react-redux"
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/UserSlice';

export default function ProtectedRoutes({children}) {
  const dispatch=useDispatch();
  const {user } =useSelector(state=>state.user)


  // get user 
  // eslint-disable-next-line
  const getuser=async()=>{
    try {
      dispatch(showLoading());
      const res=await axios.post("/api/v1/user/userdata",{token:localStorage.getItem("token")},
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })

      dispatch(hideLoading());
      if(res.data.success){
        dispatch(setUser(res.data.data))
      }
      else{
        <Navigate to ="/login"/>
        localStorage.clear();
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();

    
      console.log(error);
      
    }
  };
  useEffect(()=>{
    if(!user){
      getuser();
    }
  },{user,getuser})
  if(localStorage.getItem("token")){
    return children;
  }
  else{
    return <Navigate to="/login"/>

  }
}
