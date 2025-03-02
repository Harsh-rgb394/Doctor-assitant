

import React, { useEffect, useState } from 'react'
import axios from "axios"
import Layout from '../../components/Layout';
import moment from 'moment';
import { Table, message } from 'antd';
import { useSelector } from 'react-redux';

const DoctorAppointment = () => {

    const {user}=useSelector((state)=>state.user);
    const [appointments,setAppointments]=useState([]);
    // const dispatch=useDispatch();

    const getallappointment=async()=>{
        try {
            // dispatch(showLoading());
            const res=await axios.post("http://localhost:5000/api/v1/doctor/getdoctorapproval",{
                userId:user._id
            },{

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
          "http://localhost:5000/api/v1/doctor/appointmentstatus",
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



    // const columns=[
    //     {
    //         title:"ID",
    //         dataIndex:"_id"
    //     },
    //     {
    //         title:"Name",
    //         dataIndex:"name",
    //         render:(text,record)=>(
    //             <span>
    //                 {record.doctorId.firstname} {record.doctorId.lastname}
    //             </span>
    //         )
    //     },
    //     {
    //         title:"Phone",
    //         dataIndex:"phone",
    //         render:(text,record)=>(
    //             <span>
    //                 {record.doctorId.phone} 
    //             </span>
    //         )
    //     },
    //     {
    //         title:"DATE AND TIME",
    //         datIndex:"date",
    //         render:(text,record)=>(
    //             <span>
    //              {moment(record.date).format("DD-MM-YYYY")} &nbsp;
    //              {moment(record.time).format("HH:mm")}
    
    //             </span>
    //         )
    //     },
        
    //     {
    //         title:"Status",
    //         dataIndex:"status",
           
    //     },
    //     {
    //         title:"Status",
    //         dataIndex:"status",
    //         render:(text,record)=>(
    //             <div className='d-flex'>
    //                 {record.status==="pending" && (
    //                     <div className='d-flex'>
    //                         <button className='btn btn-success' onClick={()=>handlestatus(record,'approved')}>Approved</button>
    //                         <button className='btn btn-danger ms-2' onClick={()=>handlestatus(record,'reject')}>Rejected</button>

    //                     </div>
                        
    //                 )}
    //             </div>
    //         )
    //     }
    
    // ]
    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
            key: "id",
            render: (text) => (
                <span style={{
                    fontWeight: "500",
                    fontSize: "14px",
                    color: "#6c757d"
                }}>
                    {text.slice(-6)} {/* Show only the last 6 characters */}
                </span>
            )
        },
        {
            title: "Doctor Name",
            dataIndex: "doctorId",
            key: "name",
            render: (text, record) => (
                <span style={{
                    fontWeight: "600",
                    color: "#007bff",
                    fontSize: "14px"
                }}>
                    Dr. {record.doctorId?.firstname} {record.doctorId?.lastname}
                </span>
            )
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            render: (text, record) => (
                <span style={{
                    fontWeight: "500",
                    color: "#495057",
                    fontSize: "14px"
                }}>
                    {record.doctorId?.phone}
                </span>
            )
        },
        {
            title: "Date & Time",
            dataIndex: "date",
            key: "date",
            render: (text, record) => (
                <div style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#212529"
                }}>
                    {moment(record.date).format("DD-MM-YYYY")} &nbsp;
                    <span style={{
                        fontWeight: "500",
                        color: "#555"
                    }}>
                        {moment(record.time).format("HH:mm")}
                    </span>
                </div>
            )
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            align: "center",
            render: (text) => {
                const statusColors = {
                    pending: "#ffc107",
                    approved: "#28a745",
                };
    
                return (
                    <span style={{
                        display: "inline-block",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontWeight: "500",
                        fontSize: "13px",
                        backgroundColor: statusColors[text] || "#6c757d",
                        color: "#fff",
                        textTransform: "capitalize"
                    }}>
                        {text}
                    </span>
                );
            }
        },
        {
            title: "Action",
            dataIndex: "status",
            key: "action",
            render: (text, record) => (
                <div style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center"
                }}>
                    {record.status === "pending" && (
                        <>
                            <button
                                className="btn btn-success"
                                style={{
                                    padding: "6px 12px",
                                    fontSize: "14px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontWeight: "500"
                                }}
                                onClick={() => handlestatus(record, 'approved')}
                            >
                                Approve
                            </button>
                            <button
                                className="btn btn-danger"
                                style={{
                                    padding: "6px 12px",
                                    fontSize: "14px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontWeight: "500"
                                }}
                                onClick={() => handlestatus(record, 'reject')}
                            >
                                Reject
                            </button>
                        </>
                    )}
                </div>
            )
        }
    ];
    

  return (
    <Layout>
       
        <Table columns={columns} dataSource={appointments} scroll={{x:800}}></Table>
    </Layout>
  )
}

export default DoctorAppointment