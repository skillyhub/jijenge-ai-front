import { createSlice } from "@reduxjs/toolkit";


const initialState={
    service:{}
}
const serviceSlice=createSlice({
    name:'service',
    initialState,
    reducers:{
        setService:(state,action)=>{
            state.service=action.payload
        }
    }
})


export const {setService}=serviceSlice.actions

export const selectService=state=>state.service

export default serviceSlice.reducer