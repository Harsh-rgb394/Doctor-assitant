import {createSlice} from "@reduxjs/toolkit"
// createSlice used for making rducers wiht createslice wiht intialsate and updated state state 
export const alertslice=createSlice({
    name:"alerts",
    initialState:{
        loading:false
    },
    reducers:{
        showLoading:(state)=>{
            state.loading=true
            // these are reducers okay wiht defined actions type called wiht or export with alertlice.actions

            
        },
        hideLoading:(state)=>{
            state.loading=false

            
        }
    }
})

export const {showLoading,hideLoading}=alertslice.actions