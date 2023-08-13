import React,{useEffect,useState} from 'react'
import Layout from '../../components/Layout'
import axios from "axios"
import { Button, Table } from 'antd';

const Users = () => {


const [users,setUsers]=useState([]);


const getUsers=async()=>{
    try {
        const res=await axios.get("/api/v1/admin/getAllUsers",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })

        if(res.data.success){
                    setUsers(res.data.data);
                }
              
        
    } catch (error) {
        console.log(error);
        
    }
}






// use antd for diplaying the data 
 const columns=[
    {
        title:"Name",
        dataIndex:"name",
    },
    {
        title:"Email",
        dataIndex:"email"
    },
    {
       title:"Doctor",
       dataIndex:"isDoctor",
       render:(text,record)=>(
        <span >{record.isDoctor?"Yes":"NO"}</span>
       )
    },
    {
        title:"Actions",
        dataIndex:"actions",
        // text as arugmetn and reocrs as input or daata dicrelt access return kar rha hai
        render :(text,record)=>(
            <div className='d-flex'>
                <button className='btn btn-danger'>BLOCK</button>
            </div>
        ),
    }
 ]
useEffect(()=>{
    getUsers()
},[])
  return (
    <Layout>
        <h3>users</h3>
        <Table columns={columns} dataSource={users }/>
    </Layout>
    
  )
}

export default Users