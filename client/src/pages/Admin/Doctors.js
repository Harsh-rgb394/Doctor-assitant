import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";

const Doctors = () => {
  const [ doctors, setDoctors ] = useState([]);

  const handledoctorRequest=async(record,status)=>{
    try {
      const res=await axios.post("https://doctor-assitant-backend.onrender.com/api/v1/admin/getapprovaldoctor",{doctorId: record._id,userId:record.userId,status:status},
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
      const res = await axios.get("https://doctor-assitant-backend.onrender.com/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: "Bearer "+localStorage.getItem("token"),
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

  // const columns = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     render: (text, record) => (
  //       <span>
  //         {record.firstname} {record.lastname}
  //       </span>
  //     ),
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //   },
  //   {
  //     title: "Phone",
  //     dataIndex: "phone",
  //   },
  //   {
  //     title: "Actions",
  //     dataIndex: "actions",
  //     render: (text, record) => (
  //       <div className="d-flex">
  //         {record.status === "pending" ? (
  //           <button className="btn btn-success" onClick={()=>handledoctorRequest(record,"approved")}>Approve</button>
  //         ) : (
  //           <button className="btn btn-danger">Reject </button>
  //         )}
  //       </div>
  //     ),
  //   },
  // ];
  const columns = [
    {
      // here dataindex is that partuclar value of that fdield and record is that whole object
      // of that parituclar doctor object and thne index just the index of object redner is that
      // fuctionaloty to show how can we show these values with modiecations 
        title: "Name",
        dataIndex: "name",
        render: (text, record) => (
            <span style={{ fontWeight: "bold", color: "#333", fontSize: "20px" }}>
                {record.firstname} {record.lastname}
            </span>
        ),
    },
    {
        title: "Status",
        dataIndex: "status",
        render: (text) => (
            <span
                style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    backgroundColor: text === "pending" ? "#f8d7da" : "#d4edda",
                    color: text === "pending" ? "#721c24" : "#155724",
                    fontWeight: "500",
                    fontSize: "20px",
                    display: "inline-block"
                }}
            >
                {text}
            </span>
        )
    },
    {
        title: "Phone",
        dataIndex: "phone",
        render: (text) => (
            <span style={{ fontFamily: "monospace", color: "#555", fontSize: "23px" }}>
                {text}
            </span>
        ),
    },
    {
        title: "Actions",
        dataIndex: "actions",
        render: (text, record) => (
            <div className="d-flex" style={{ gap: "8px" }}>
                {record.status === "pending" ? (
                    <button
                        className="btn btn-success"
                        onClick={() => handledoctorRequest(record, "approved")}
                        style={{
                            padding: "6px 12px",
                            fontSize: "20px",
                            cursor: "pointer",
                            borderRadius: "4px",
                            backgroundColor: "#28a745",
                            color: "#fff",
                            border: "none",
                        }}
                    >
                        Approve
                    </button>
                ) : (
                    <button
                        className="btn btn-danger"
                        style={{
                            padding: "6px 12px",
                            fontSize: "13px",
                            cursor: "pointer",
                            borderRadius: "4px",
                            backgroundColor: "#dc3545",
                            color: "#fff",
                            border: "none",
                        }}
                    >
                        Reject
                    </button>
                )}
            </div>
        ),
    },
];


  return (
    <Layout>
      <Table columns={columns} dataSource={doctors}/>

    </Layout>
  );
};

export default Doctors;
