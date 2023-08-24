import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../Redux/UserSlice";
const BackentURl = import.meta.env.VITE_Backent_URL

export default function EmailVerify() {
  const dispatch = useDispatch();
  const [validUrl, setValidUrl] = useState(false);
  const params = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        console.log("logggedd");
        const url = `${BackentURl}/api/auth/${params.id}/verify/${params.token}`;
        const { data } = await axios.get(url);
        if (data) {
          setValidUrl(true);

          dispatch(
            setUserDetails({
              id: data.user._id,
              username: data.user.username,
              email: data.user.email,
              isSeller: data.user.isSeller,
            })
          );

          localStorage.setItem("currentUser", data.jwtToken);
        }
      } catch (error) {
        console.log(error);
        //setValidUrl(false)
      }
    };
    verifyEmailUrl();
  }, [params]);
  return (
    <>
      {validUrl ? (
        <div className="flex items-center justify-center min-h-screen bg-white">
          <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
            <img
              src="https://res.cloudinary.com/dvprhxg7x/image/upload/v1692686918/asset/success_kze9jm.png"
              alt="Success"
              class="mx-auto mb-4 w-24 h-24"
            />
            <h1 className="text-3xl font-semibold mb-2 text-gray-800">
              Email Verified
            </h1>
            <p className="text-gray-600 mb-4">
              Thank you for verifying your email address.
            </p>
            <Link to="/">
              <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-6 rounded-full transition duration-300">
                Continue to Home
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <h1>404 page Not Found</h1>
      )}
    </>
  );
}
