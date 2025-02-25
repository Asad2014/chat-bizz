import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/SignUp";


const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      navigate("/chat");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="w-full max-w-lg bg-white/20 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/30">
        <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-lg mb-6">CHAT BIZZ</h1>
        
        {/* Tab Buttons */}
        <div className="flex bg-white/10 rounded-lg p-1 mb-4">
          <button
            className={`w-1/2 py-2 text-lg font-semibold rounded-lg transition-all duration-300 ${
              activeTab === "login" ? "bg-white text-blue-600 shadow-md" : "text-white hover:bg-white/20"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 text-lg font-semibold rounded-lg transition-all duration-300 ${
              activeTab === "signup" ? "bg-white text-purple-600 shadow-md" : "text-white hover:bg-white/20"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            SignUp
          </button>
        </div>
        
        {/* Content */}
        <div className="mt-4 p-4 bg-white/20 rounded-xl shadow-md">
          {activeTab === "login" ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
};

export default Home;
