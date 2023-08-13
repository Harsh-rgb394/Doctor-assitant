import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";

const Doctors = () => {
  const [ doctors, setDoctors ] = useState([]);

  const handledoctorRequest=async(record,status)=>{
    try {
      const res=await axios.post("/api/v1/admin/getapprovaldoctor",{doctorId: record._id,userId:record.userId,status:status},
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      }
      )

      if(res.data.success){
        message.success(res.data.message)
      }
      
    } catch (error) {
      console.error("something went wrong");
      
    }

  }

  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstname} {record.lastname}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button className="btn btn-success" onClick={()=>handledoctorRequest(record,"approved")}>Approve</button>
          ) : (
            <button className="btn btn-danger">Reject </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h3>doctors</h3>
      <Table columns={columns} dataSource={doctors}/>

    </Layout>
  );
};

export default Doctors;
