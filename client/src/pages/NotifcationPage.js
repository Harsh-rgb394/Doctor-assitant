import React from 'react'
import Layout from '../components/Layout'
import { Tabs, message } from 'antd'
import { useSelector,useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/alertSlice'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const NotifcationPage = () => {
    const {user}=useSelector(state=>state.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    // isse user ke ander notiticaton usse get karke dredux se 

    // handle to read all notifications okay 
    const handlemarkread=async()=>{
        try {
            dispatch(showLoading);
            const res=await axios.post("/api/v1/user/get-all-notification",{userId:user._id},{
                headers:
                {
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading);
            if(res.data.success){
                message.success(res.data.message);

            }
            else{
                message.error(res.data.message);
            }
            
            
        } catch (error) {
            dispatch(hideLoading);

            console.log(error);
            message.error("something is wrong");
            
        }

    }


    // delete all the notifications 
    const handledeleteread=async()=>{
        try {
            dispatch(showLoading);
            const res=await axios.post("/api/v1/user/delete-all-notification",{userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })


        dispatch(hideLoading);
        if(res.data.success){
            message.success(res.data.message);

        }
        else{
            message.error(res.data.message);
        }
            
        } catch (error) {
            dispatch(hideLoading);
            console.log(error);
            message.error("something is wrong");
            
        }

    }
  return (
  <Layout>
       <h4 className='p-3'>NotifcationPage</h4>
       <Tabs>
        <Tabs.TabPane tab="UnRead" key={0} >
            <div className='d-flex justify-content-end'>
                <h4 className='p-2' onClick={handlemarkread} style={{cursor:"pointer"}}>Mark all read</h4>
            </div>
            {
                user?.notificaton.map((notificationMsgs)=>(
                    <div className='card' onClick={navigate(notificationMsgs.onClickPath)} style={{cursor:'pointer'}}>
                        <div className='card-text'>
                            {notificationMsgs.message}
                        </div>
                    </div>

                ))
             }
        </Tabs.TabPane>

        <Tabs.TabPane tab="Read" key={1}>
            <div className='d-flex justify-content-end'>
                <h4 className='p-2' onClick={handledeleteread} style={{cursor:"pointer"}}>Delete all read</h4>
            </div>

            {
                user?.seennotification.map((notificationMsgs)=>(
                    <div className='card' onClick={navigate(notificationMsgs.onClickPath)} style={{cursor:'pointer'}}>
                        <div className='card-text'>
                            {notificationMsgs.message}
                        </div>
                    </div>

                ))
             }
            
        </Tabs.TabPane>
       </Tabs>
  </Layout>
 
  )
}

export default NotifcationPage