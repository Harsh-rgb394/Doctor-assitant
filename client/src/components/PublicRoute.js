import React from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
    // imse login ya regster per laga hai
    // agar login ho pehele se sidhe homepage par dircet ho jaoo
    // again ya again login page nahi jana
  } else {
    return children;
  }
}
