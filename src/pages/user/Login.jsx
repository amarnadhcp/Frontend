import axios from "axios";
import { Link } from 'react-router-dom';

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserLogin,userLoginwithGoogle } from "../../api/userApi";
import { useDispatch } from 'react-redux';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import { setUserDetails } from '../../Redux/UserSlice';

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState('');
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

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
                        userLoginwithGoogle(res.data).then((res) => {
                            console.log(res.data,"the user data");
                            if (res.data.status) {
                                dispatch(setUserDetails({
                                    id: res.data.user._id,
                                    username: res.data.user.username,
                                    email: res.data.user.email,
                                    image:res.data.user.img,
                                    isSeller:res.data.user.isSeller,
                                    country:res.data.user.country,
                                   desc:res.data.user.desc

                                }))
                                localStorage.setItem("currentUser", res.data.token)
                                navigate("/")

                            } else if (res.data.exists) {
                                setError("Account already exists");
                            }
                        });
                    }) .catch((err) => console.log(err));

            }},[user]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = user
        try {
            if (email.trim() === ""){
                setError("Email is Empty")
            } else if (password.trim() === "") {
                setError("password is empty")
            } else {
                const res = await UserLogin(user)
                if (res.data.access) {
                    dispatch(setUserDetails({
                        id: res.data.info._id,
                        username: res.data.info.username,
                        email: res.data.info.email,
                        isSeller:res.data.info.isSeller,
                        country:res.data.info.country,
                        desc:res.data.info.desc
                    }))
                    localStorage.setItem("currentUser", res.data.token)
                    navigate("/")
                } else {
                    setError(res.data.message)
                }

            }
        } catch (err) {
            setError(err.response.data.message)
        }
    }
    return (

        <div className="flex items-center bg-[url('./img/login.jpeg')] h-screen bg-cover justify-center">
          <div className="flex justify-end">
            <div className="w-full md:w-96 p-8 border border-gray-300">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h1 className="text-white text-3xl mb-4 font-semibold">Login</h1>
        
                <label htmlFor="username" className="text-white text-lg font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="px-4 py-2 border border-gray-300"
                  onChange={(e) => { setUser({ ...user, [e.target.name]: e.target.value }) }}
                />
        
                <label htmlFor="password" className="text-white text-lg font-medium">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="px-4 py-2 border border-gray-300"
                  onChange={(e) => { setUser({ ...user, [e.target.name]: e.target.value }) }}
                />

               {error && (
                  <span className="text-red-500 text-lg text-center">{error}</span>
                )}

                <div className="flex items-center justify-between">
                  <button
                    className="flex items-center justify-center mx-auto my-5 py-2 px-4 w-40 bg-white border border-white-300 rounded-lg text-gray-700 font-semibold shadow-lg transform transition hover:scale-105 focus:outline-none"
                    type="button"
                    onClick={() => {
                      login();
                    }}
                  >
                    <FcGoogle className="inline-block w-6 h-6 mr-2" />
                    <span className="font-normal">Sign in</span>
                  </button>
                  <span className="mx-4 text-white">OR</span>
                  <button
                    type="submit"
                    className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg py-2 px-4 rounded focus:outline-none hover:scale-105 focus:shadow-outline w-40"
                  >
                    Login
                  </button>
                </div>
                
                <div className="flex items-center justify-center ">
                  <p className="text-white text-lg">
                    Don't have an account?{' '}
                    <Link
                      to="/register"
                      className="text-purple-600 underline font-semibold"
                    >
                      Register here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        

    )
}

export default Login