import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import "../styles/Layout.css";
import { Row } from "antd";
import Doctorlist from "./Doctorlist";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  console.log(doctors);
  const userdata = async () => {
    // cleint se token genertate kar diya and ha/getlistdoctorsi usse backend or server saide bheja ahia
    try {
      const res = await axios.get(
          "http://localhost:5000/api/v1/user/getlistdoctors",
          // Request body (if any) can be passed as the second argument
          {
              headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"), // Add a space after "Bearer"
              },
          }
      );

      if (res.data.success) {
        // res ke ander data ka object hota by default then uske ander success vaorble check ke true ke nahi then true then 
        // res ke data ke ander data hai jo vo set kar diya 
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userdata();
  }, []);
  // jesse he tum homepage par gaye then sirf ke bar he call karke ga ya implmenet hoga 
  // If you later decide to include dependencies in the array (e.g., [someValue]), the effect will run whenever the specified dependencies change.
  return (
    // home page ko layour se wrap kar doya hai
    <Layout>
       <Row>
        {doctors && doctors.map((doctor) => <Doctorlist doctor={doctor} />)}
      </Row>
      
    </Layout>
  );
};

export default HomePage;
