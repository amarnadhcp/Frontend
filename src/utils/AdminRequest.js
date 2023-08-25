import axios from "axios"
const AdminUrl = import.meta.env.VITE_AdminBaseUrl

const adminRequest = axios.create({
    baseURL:AdminUrl
})

export default adminRequest




