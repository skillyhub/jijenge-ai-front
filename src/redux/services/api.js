import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery=fetchBaseQuery({
    baseUrl:'',
    prepareHeaders:(headers,{getState})=>{
        const token=getState().token
        if(token){
            headers.set("authorization",`Bearer ${token}`)
        }
        return headers
    }

})

export const splitApi=createApi({
    reducerPath:'splitApi',
    baseQuery,
    endpoints:()=>({})
})