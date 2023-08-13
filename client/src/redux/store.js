import { configureStore } from "@reduxjs/toolkit";
import { alertslice } from "./features/alertSlice";
import { UserSlice } from "./features/UserSlice";

export default configureStore({
    reducer:{
        alerts:alertslice.reducer, 
        user:UserSlice.reducer
    }
})