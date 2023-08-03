import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

export default function EmailVerify() {
    const [validUrl, setValidUrl] = useState(false);
    const params = useParams()

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                console.log("logggedd");
                const url = `http://localhost:8800/api/auth/${params.id}/verify/${params.token}`
                const { data } = await axios.get(url)
                console.log(data.user._id,"htane iddddd");
                console.log(data.user);

                
                setValidUrl(true)
            } catch (error) {
                console.log(error)
                //setValidUrl(false)
            }
        }
        verifyEmailUrl()
    },[params])
    return (
        <>
            {validUrl ? (
                <div className="flex justify-center items-center flex-col">
                    <img src="./img/success.png" alt="success_img" className=""/>
                    <h1>Email Verified Successfully</h1>
                    <Link to="/">
                        <button className="">HOME</button>
                    </Link>
                </div>
            ): (
                    <h1>404 asdNot Found</h1>
            )}
        </>
    )
}