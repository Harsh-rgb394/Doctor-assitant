import React from "react";
import Layout from "../components/Layout";
import { Tabs, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/notification.css";
import { updatenotifications } from "../redux/features/UserSlice";

const NotifcationPage = () => {
  const { user } = useSelector((state) => state.user);
  // console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // isse user ke ander notiticaton usse get karke dredux se

  // handle to read all notifications okay
  const handlemarkread = async () => {
    try {
      dispatch(showLoading);
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/get-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading);
      if (res.data.success) {
        message.success(res.data.message);
        dispatch(updatenotifications({
          notificaton: [],
          seennotification: [...user.notificaton, ...user.seennotification] 
        }))
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading);

      console.log(error);
      message.error("something is wrong");
    }
  };

  // delete all the notifications
  const handledeleteread = async () => {
    try {
      dispatch(showLoading);
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading);
      if (res.data.success) {
        message.success(res.data.message);
        dispatch(updatenotifications({
          notificaton: [],
          seennotification: [] 
        }))
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading);
      console.log(error);
      message.error("something is wrong");
    }
  };
  return (
    <Layout>
      <div className="notifications-container">

  <Tabs className="notifications-tabs">
    {/* Unread Notifications Tab */}
    <Tabs.TabPane tab="Unread" key={0}>
      <div className="tab-header">
        <h4 className="mark-read-btn" onClick={handlemarkread}>
          Mark all as Read
        </h4>
      </div>
      {user?.notificaton.length > 0 ? (
        user?.notificaton.map((notificationMsgs, index) => (
          <div key={index} className="notification-card" onClick={() => navigate(notificationMsgs.onClickPath)}>
            <p className="notification-text">{notificationMsgs.message}</p>
          </div>
        ))
      ) : (
        <p className="empty-message">No unread notifications</p>
      )}
    </Tabs.TabPane>

    {/* Read Notifications Tab */}
    <Tabs.TabPane tab="Read" key={1}>
      <div className="tab-header">
        <h4 className="delete-read-btn" onClick={handledeleteread}>
          Delete all Read
        </h4>
      </div>
      {user?.seennotification.length > 0 ? (
        user?.seennotification.map((notificationMsgs, index) => (
          <div key={index} className="notification-card read" onClick={() => navigate(notificationMsgs.onClickPath)}>
            <p className="notification-text">{notificationMsgs.message}</p>
          </div>
        ))
      ) : (
        <p className="empty-message">No read notifications</p>
      )}
    </Tabs.TabPane>
  </Tabs>
</div>

    </Layout>
  );
};

export default NotifcationPage;
