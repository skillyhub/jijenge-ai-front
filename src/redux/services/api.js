import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery=fetchBaseQuery({
    baseUrl:process.env.baseUrl,

})

export const splitApi=createApi({
    reducerPath:'splitApi',
    baseQuery,
    endpoints:()=>({})
})