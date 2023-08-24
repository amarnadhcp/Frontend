import axios from "axios"
const AdminUrl = import.meta.env.VITE_AdminBaseUrl
console.log(AdminUrl,435);
const adminRequest = axios.create({
    baseURL:AdminUrl
})

export default adminRequest




