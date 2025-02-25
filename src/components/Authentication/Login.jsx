import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      toast.warning('Please enter the credentials');
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const { data } = await axios.post("https://chatapp-production-31d4.up.railway.app/api/user/login", { email, password }, config);
      toast.success("Login successful");

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chat");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">Login</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-white font-medium">Email</label>
            <input 
              type="email" 
              className="w-full p-3 bg-transparent border border-white/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" 
              placeholder="Enter your email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label className="block text-white font-medium">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                className="w-full p-3 bg-transparent border border-white/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" 
                placeholder="Enter password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button 
                type="button" 
                className="absolute right-3 top-3 text-sm text-white hover:text-gray-300"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button 
            type="button" 
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            disabled={loading} 
            onClick={handleLogin}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;



