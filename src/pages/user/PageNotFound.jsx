import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PageNotFound = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleReturnHome = () => {
        navigate("/");
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-6xl text-gray-800 font-semibold mb-2">404</h1>
                <p className="text-lg text-gray-600 mb-4">Oops! Page Not Found</p>
                <p className="text-gray-600">
                    The page you are looking for might have been removed, had its name changed,
                    or is temporarily unavailable.
                </p>
                <button
                    className="text-blue-500 hover:underline mt-4"
                    onClick={handleReturnHome}
                >
                    Return to Home
                </button>
            </div>
        </div>
    );
}

export default PageNotFound;
