import React, { useEffect, useState } from 'react'
import axios from "axios"
import Layout from '../components/Layout'
import moment from 'moment';
import { Table } from 'antd';
import { useSelector } from 'react-redux';

const Appointments = () => {

    const { user } = useSelector((state) => state.user);
    const [appointments,setAppointments]=useState([]);
    // const dispatch=useDispatch();
    console.log(appointments);

    const getallappointment=async()=>{
        try {
            // dispatch(showLoading());
            const res=await axios.post("http://localhost:5000/api/v1/user/get-all-book-appointment",{userId:user._id},
                {
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
    // {
    //     title:"ID",
    //     dataIndex:"_id"
    // },
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
    // {
    //     title:"DATE AND TIME",
    //     datIndex:"date",
    //     render:(text,record)=>(
    //         <span>
    //          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
    //          {moment(record.time).format("HH:mm")}

    //         </span>
    //     )
    // },
    
    // {
    //     title:"Status",
    //     dataIndex:"status",
       
    // }
    {
        title: "Appointment ID",
        dataIndex: "_id",
        key: "_id",
        align: "center",
        width: 120,
        render: (text) => (
            <span style={{ fontWeight: "500", color: "#555" }}>
                {text.slice(-6)}  {/* Show only last 6 characters for cleaner look */}
            </span>
        ),
    },
    {
        title: "Doctor",
        dataIndex: "doctorId",
        key: "doctor",
        align: "center",
        render: (text, record) => (
            <span style={{ fontWeight: "500", color: "#007bff" }}>
                Dr. {record.doctorId?.firstname} {record.doctorId?.lastname}
            </span>
        ),
    },
    {
        title: "Specialization",
        dataIndex: "doctorId",
        key: "specialization",
        align: "center",
        render: (text, record) => (
            <span style={{ color: "#6c757d" }}>{record.doctorId?.specialization}</span>
        ),
    },
    {
        title: "Date",
        dataIndex: "date",
        key: "date",
        align: "center",
        render: (text, record) => (
            <span style={{ color: "#212529" }}>
                {moment(record.date).format("DD-MM-YYYY")}
            </span>
        ),
    },
    {
        title: "Time",
        dataIndex: "time",
        key: "time",
        align: "center",
        render: (text, record) => (
            <span style={{ color: "#212529" }}>
                {moment(record.time).format("hh:mm A")} {/* 12-hour format */}
            </span>
        ),
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        align: "center",
        render: (text) => {
            const statusStyles = {
                padding: "6px 12px",
                borderRadius: "15px",
                fontWeight: "500",
                fontSize: "12px",
                textTransform: "capitalize",
                display: "inline-block",
                color: "#fff",
                backgroundColor:
                    text === "pending" ? "#ffc107" :
                    text === "approved" ? "#28a745" :

                    "#6c757d"
            };
            return <span style={statusStyles}>{text}</span>;
        },
    },
    {
        title: "Contact",
        dataIndex: "contact",
        key: "contact",
        align: "center",
        render: (text, record) => (
            <span style={{ fontWeight: "500", color: "#495057" }}>
                {record.doctorId?.phone}
            </span>
        ),
    },


]
  return (
    <Layout>
        <hr/>
        <Table columns={columns} dataSource={appointments} scroll={{x:800}}></Table></Layout>
  )
}

export default Appointments