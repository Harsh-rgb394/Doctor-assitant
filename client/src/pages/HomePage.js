import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import "../styles/Layout.css";
import { Row } from "antd";
import Doctorlist from "./Doctorlist";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  const userdata = async () => {
    // cleint se token genertate kar diya and ha/getlistdoctorsi usse backend or server saide bheja ahia
    try {
      const res = await axios.get(
        "/api/v1/user/getlistdoctors",
        
        // req.body mein empty pass kiya ahi 
        // and req headers mein authoriaaation and uske ander bearer theen token pass kar rha hai 

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      <h1>this is homepage</h1> 
       <Row>
        {doctors && doctors.map((doctor) => <Doctorlist doctor={doctor} />)}
      </Row>
      {/* <div className="homeImage">
        <img
          className="imgag"
          src="https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-health-care-appointment-registration-image_172582.jpg"
          alt="docimage "
        />
      </div> */}
    </Layout>
  );
};

export default HomePage;
