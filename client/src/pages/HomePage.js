import React from 'react'
import { useEffect,useState } from 'react'
import axios from "axios"
import Layout from '../components/Layout'
import "../styles/Layout.css"
import { Row } from 'antd'
import Doctorlist from './Doctorlist'

const HomePage = () => {

  const [doctors,setDoctors]=useState([]);

  const userdata=async()=>{
    // cleint se token genertate kar diya and ha/getlistdoctorsi usse backend or server saide bheja ahia 
    try {
      const res=await axios.get("/api/v1/user/getlistdoctors",{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      

    if(res.data.success){
      setDoctors(res.data.data);
    }
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(()=>{
    userdata()
  },[])
  return (
    // home page ko layour se wrap kar doya hai 
    <Layout><h1>this is homepage</h1>
    <Row>
      {doctors && doctors.map(doctor =>(
        <Doctorlist doctor={doctor}/>
      ))}
    </Row>
    
    
    
    </Layout>
  )
}

export default HomePage