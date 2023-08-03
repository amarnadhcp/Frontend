import axios from "axios"

const adminRequest = axios.create({
    baseURL:"http://localhost:8800/admin"
})

export default adminRequest




