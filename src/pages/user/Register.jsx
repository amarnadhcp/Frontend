import axios  from "axios";
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
// import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {  useGoogleLogin } from '@react-oauth/google';
import {userRegisterWithGoogle,userRegister} from "../../api/userApi"
import { useDispatch } from "react-redux";
import { setUserDetails } from '../../Redux/UserSlice';

const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
    () => {
      if (user) {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          }).then((res) => {
            console.log(res.data);
            userRegisterWithGoogle(res.data).then((res) => {
              if (res.data.created) {
                console.log(res.data,"this is the users dataa");
                dispatch(setUserDetails({
                  id:res.data.user._id,
                  username:res.data.user.username,
                  email:res.data.user.email,
                  image:res.data.user.img,
                  isSeller:res.data.user.isSeller
                }))
                localStorage.setItem("currentUser",res.data.token)
                navigate("/")
          
              } else if (res.data.exists) {
                setError("Account already exists");
              }
            });
          }).catch((err) => console.log(err));  
        
        }

     },[user] );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {username,email,password}=user
    try {
      if (username.trim() == "") {
        setError("usernmae cannot be empty")
      } else if (email.trim() === "") {
        setError("Email is Empty")
      } else if (password.trim() === "") {
        setError("password is empty")
      } else {
        const response = await userRegister(user)
        if (response.data.created) {
    
          setError(response.data.message)
        } else {
          setError(response.data.message)
        }
      }

    } catch (err) {
      console.log(err);
      setError(err.response.data);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center h-screen bg-cover bg-[url('./img/login.jpeg')]">
    <div className="w-full md:w-3/4">
      <div className="text-white text-center md:text-left p-8 md:pl-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-8">Find the Perfect Freelancer for Your Project</h1>
        <p className="italic font-light text-xl md:text-3xl">Connecting People and Skills</p>
      </div>
    </div>
  
    <div className="w-full md:w-1/3 mx-6 md:mr-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-gray-700 text-2xl md:text-3xl mb-4 text-center md:text-left font-bold">Sign In</h1>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-lg mb-2">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-lg mb-2">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
          />
        </div>
  
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-lg mb-2">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
          />
        </div>
  
        {error && <span className="text-red-500 text-sm md:text-lg text-center block">{error}</span>}
  
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
          <button
            className="flex items-center justify-center my-3 md:my-5 py-2 px-4 w-full md:w-32 bg-white border border-gray-300 rounded-lg text-gray-700 font-semibold shadow-lg transform transition hover:scale-105 focus:outline-none md:mr-2 md:w-auto"
            type="button"
            onClick={() => {
              login();
            }}
          >
            <FcGoogle className="inline-block w-6 h-6 mr-2" />
            <span className="font-normal">Sign in </span>
          </button>
          <span className="my-3 md:my-0 mx-2 md:mx-4 text-gray-700 font-semibold">OR</span>
          <div className="w-px bg-gray-300 my-3 md:my-0 mx-2 md:mx-4"></div>
  
          <button
            type="submit"
            className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg py-2 px-4 rounded focus:outline-none hover:scale-105 focus:shadow-outline md:my-3 md:ml-2 md:w-auto"
          >
            Sign in
          </button>  
        </div>
  
        <div className="flex items-center justify-center mt-4">
          <p className="text-black text-lg">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-purple-600 underline font-semibold"
            >
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  </div>
  
  

  

  

  
  );
};

export default Register;
