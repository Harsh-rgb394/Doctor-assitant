

import React, { useEffect, useState } from 'react'
import axios from "axios"
import Layout from '../../components/Layout';
import moment from 'moment';
import { Table, message } from 'antd';

const DoctorAppointment = () => {


    const [appointments,setAppointments]=useState([]);
    // const dispatch=useDispatch();

    const getallappointment=async()=>{
        try {
            // dispatch(showLoading());
            const res=await axios.get("api/v1/doctor/getdoctorapproval",{
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

// for chekcing the status of appintment of approved or rejdcted okay 
const handlestatus=async(record,status)=>{
    // try {
    //     const res=await axios.post("/api/v1/doctor/appointmentstatus",{appointmentsId:record._id,status},{
    //         headers:{
    //             Authorization:`Bearer${localStorage.getItem("token")}`
    //         }
    //     })

    // if(res.data.success){
    //     message.success(res.data.message);
    // }
        
    // } catch (error) {
    //     console.log(error);
    //     message.error("something is wrong");
    //     getallappointment();
        
    // }
    try {
        // dispatch(showLoading());
        const resposne = await axios.post(
          "/api/v1/doctor/appointmentstatus",
          { appointmentId : record._id, status: status },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // dispatch(hideLoading());
        if (resposne.data.success) {
          message.success(resposne.data.message);
          getallappointment();
        }
      } catch (error) {
        message.error("Error changing doctor account status");
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
        // }
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
           
        },
        {
            title:"Status",
            dataIndex:"status",
            render:(text,record)=>(
                <div className='d-flex'>
                    {record.status==="pending" && (
                        <div className='d-flex'>
                            <button className='btn btn-success' onClick={()=>handlestatus(record,'approved')}>Approved</button>
                            <button className='btn btn-danger ms-2' onClick={()=>handlestatus(record,'reject')}>Rejected</button>

                        </div>
                        
                    )}
                </div>
            )
        }
    
    ]



  return (
    <Layout>
        <h3>
        Appointments List Of Doctor</h3>
        <hr/>
        <Table columns={columns} dataSource={appointments}></Table>
    </Layout>
  )
}

export default DoctorAppointment