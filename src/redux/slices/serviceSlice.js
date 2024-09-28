import { createSlice } from "@reduxjs/toolkit";


const initialState={
    token:"",
    service:{
        phone_number:"+25",
        analyze:""
    }
}
const serviceSlice=createSlice({
    name:'service',
    initialState,
    reducers:{
        setService:(state,action)=>{
            state.service=action.payload
        },
        setToken:(state,action)=>{
            state.token=action.payload
        },
        setAnalyze:(state,action)=>{
            state.service.analyze=action.payload
        }
        
    }
})


export const {setService,setToken,setAnalyze}=serviceSlice.actions

export const selectService=state=>state.service
export const selectPhone=state=>state.service.phone_number
export const selectToken=state=>state.token
export const selectanAnalyze=state=>state.service.analyze

export default serviceSlice.reducer