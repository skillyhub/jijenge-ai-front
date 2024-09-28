const { splitApi } = require("./api");

const servicesApi=splitApi.injectEndpoints({
    endpoints:(builder)=>({
        getMessage:builder.mutation({
            query(){
                return{
                    url:'/'
                }
            }
        })
    })
})

export const {
    useGetMessageMutation
}=servicesApi