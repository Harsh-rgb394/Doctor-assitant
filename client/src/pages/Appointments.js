import React, { useEffect, useState } from 'react'
import axios from "axios"
import Layout from '../components/Layout'
import moment from 'moment';
import { Table } from 'antd';

const Appointments = () => {

    const [appointments,setAppointments]=useState([]);
    // const dispatch=useDispatch();

    const getallappointment=async()=>{
        try {
            // dispatch(showLoading());
            const res=await axios.get("api/v1/user/get-all-book-appointment",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            // dispatch(hideLoading());
            if(res.data.success){
                setAppointments(res.data.data);
            }
            
        } catch (error) {
            console.log(error);
            // dispatch(hideLoading());

            
        }

    }

useEffect(()=>{
    getallappointment();

},[])

const columns=[
    {
        title:"ID",
        dataIndex:"_id"
    },
    // {
    //     title:"Name",
    //     dataIndex:"name",
    //     render:(text,record)=>(
    //         <span>
    //             {record.doctorId.firstname} {record.doctorId.lastname}
    //         </span>
    //     )
    // },
    // {
    //     title:"Phone",
    //     dataIndex:"phone",
    //     render:(text,record)=>(
    //         <span>
    //             {record.doctorId.phone} 
    //         </span>
    //     )
    // },
    {
        title:"DATE AND TIME",
        datIndex:"date",
        render:(text,record)=>(
            <span>
             {moment(record.date).format("DD-MM-YYYY")} &nbsp;
             {moment(record.time).format("HH:mm")}

            </span>
        )
    },
    
    {
        title:"Status",
        dataIndex:"status",
       
    }

]
  return (
    <Layout><h3>
        Appointments</h3>
        <hr/>
        <Table columns={columns} dataSource={appointments}></Table></Layout>
  )
}

export default Appointments