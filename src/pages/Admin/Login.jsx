import React, { useState } from "react";
import { AdminLogin } from "../../api/adminApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [admin, setAdmin] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = admin
    try {
      if (email.trim() === "") {
        setError("email is empty")
      }else if(password.trim()===""){
        setError("password is empty")
      }else{
        const response = await AdminLogin(admin)
        if(response.data.access){
          localStorage.setItem("currentAdmin", response.data.token)
          navigate("/admin/")
        }else{
          setError(response.data.message)
        }
      }
    } catch (error) {

    }
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => { setAdmin({ ...admin, [e.target.name]: e.target.value }) }}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => { setAdmin({ ...admin, [e.target.name]: e.target.value }) }}

            />
          </div>
          <div className="mb-6 flex items-center justify-center">
            <label className="text-red-500 text-lg text-center">{error}</label>
          </div>


          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


export default Login