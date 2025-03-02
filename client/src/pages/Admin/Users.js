import React,{useEffect,useState} from 'react'
import Layout from '../../components/Layout'
import axios from "axios"
import { Button, Table } from 'antd';

const Users = () => {


const [users,setUsers]=useState([]);


const getUsers=async()=>{
    try {
        const res=await axios.get("http://localhost:5000/api/v1/admin/getAllUsers",
        {

            headers:{
                Authorization:"Bearer "+ localStorage.getItem("token")
            }
        }
        )

        if(res.data.success){
                    setUsers(res.data.data);
                }
              
        
    } catch (error) {
        console.log(error);
        
    }
}






// use antd for diplaying the data 
//  const columns=[
//     {
//         title:"Name",
//         dataIndex:"name",
//     },
//     {
//         title:"Email",
//         dataIndex:"email"
//     },
//     {
//        title:"Doctor",
//        dataIndex:"isDoctor",
//        render:(text,record)=>(
//         <span >{record.isDoctor?"Yes":"NO"}</span>
//        )
//     },
//     {
//         title:"Actions",
//         dataIndex:"actions",
//         // text as arugmetn and reocrs as input or daata dicrelt access return kar rha hai
//         render :(text,record)=>(
//             <div className='d-flex'>
//                 <button className='btn btn-danger'>BLOCK</button>
//             </div>
//         ),
//     }
//  ]
const columns = [
    {
        title: "Name",
        dataIndex: "name",
        render: (text) => (
            <span style={{ fontWeight: "500", fontSize: "20px", color: "#333" }}>
                {text}
            </span>
        )
    },
    {
        title: "Email",
        dataIndex: "email",
        render: (text) => (
            <span style={{ fontSize: "20px", color: "#555" }}>
                {text}
            </span>
        )
    },
    {
        title: "Doctor",
        dataIndex: "isDoctor",
        render: (text, record) => (
            <span
                style={{
                    fontWeight: "bold",
                    color: record.isDoctor ? "green" : "red",
                    padding: "5px 10px",
                    backgroundColor: record.isDoctor ? "#e6ffe6" : "#ffe6e6",
                    borderRadius: "5px",
                    display: "inline-block",
                }}
            >
                {record.isDoctor ? "✔️ True" : "❌ False"}
            </span>
        )
    },
    {
        title: "Actions",
        dataIndex: "actions",
        render: (text, record) => (
            <div style={{ display: "flex", gap: "10px" }}>
                <button
                    style={{
                        backgroundColor: "crimson",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "background 0.3s ease",
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "darkred"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "crimson"}
                >
                    BLOCK
                </button>
            </div>
        )
    }
];

useEffect(()=>{
    getUsers()
},[])
  return (
    <Layout>
        <Table columns={columns} dataSource={users }/>
    </Layout>
    
  )
}

export default Users