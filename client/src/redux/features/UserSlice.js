import {createSlice} from "@reduxjs/toolkit"

export const UserSlice=createSlice({
    name:"user",
    initialState:{
        user:null
    },
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload;
        },
        updatenotifications:(state, action)=> {
            state.user = {
                ...state.user,
                notificaton: action.payload.notificaton,
                seennotification: action.payload.seennotification
            };
        }
    },
})

export const {setUser,updatenotifications}=UserSlice.actions