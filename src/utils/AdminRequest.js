import axios from "axios"
const AdminUrl = import.meta.env.VITE_AdminBaseUrl

const adminRequest = axios.create({
    baseURL:AdminUrl
})

adminRequest.interceptors.request.use((req)=>{
    if(localStorage.getItem("currentAdmin")){
        req.headers.Authorization = "Bearer "+ localStorage.getItem("currentAdmin")
    }
   
    return req
})

export default adminRequest




