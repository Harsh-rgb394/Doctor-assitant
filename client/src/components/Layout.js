import React from "react";
import { UserMenu, adminmenu } from "../Data/Data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
// import "../styles/Layout.css";
import  "../styles/Layout.css";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const location = useLocation();
  // access and manipulate the current URL location within a web application mtbl like localhost:3000/apply-doctor
  const navigate = useNavigate();
  // if user exist or gets then isadmin or not then adminmenu then usermnu

  const logouthandler = () => {
    localStorage.clear();
    message.success("logout successfully");
    navigate("/login");
  };

  //    doctor menu   ======================
  const doctormenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },

    {
      name: "Profile",
      //   path:  "/doctor/profile",
      path: `/doctor/profile`,
      icon: "fa-solid fa-user",
    },
  ];

  //   doctor menu =================================

  const sidebarmenu = user?.isAdmin
    ? adminmenu
    : user?.isDoctor
    ? doctormenu
    : UserMenu;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6 className="text">DOC-HELP</h6>
              <div className="user-role">
          {user?.isDoctor ? (
            <GiPlagueDoctorProfile className="user-icon" />
          ) : user?.isAdmin ? (
            <MdOutlineAdminPanelSettings className="user-icon" />
          ) : (
            <FaRegUser className="user-icon" />
          )}
        </div>
              <hr />
            </div>
            <div className="menu">
              {sidebarmenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menuitem ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menuitem`} onClick={logouthandler}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
                {/* <p>logout</p> */}
              </div>
            </div>
          </div>
          {/* child element ke andar nahi dekk rha hai  */}
          <div className="content">
            <div className="header">
              <div className="headercontent" style={{ cursor: "pointer" }}>
                <Badge
                  count={user && user.notificaton.length}
                  onClick={() => navigate("/notification")}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>
                <Link to="/userprofile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
