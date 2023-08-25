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
    <div class="bg-gray-100 flex justify-center items-center h-screen">
  <div class="w-full max-w-md">
    <form onSubmit={handleSubmit} class="bg-white shadow-lg rounded-lg px-10 py-8">
      <h2 class="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => { setAdmin({ ...admin, [e.target.name]: e.target.value }) }}
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => { setAdmin({ ...admin, [e.target.name]: e.target.value }) }}
        />
      </div>
      <div class="mb-6">
        <p class="text-red-500 text-sm">{error}</p>
      </div>

      <div class="flex items-center justify-center">
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
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