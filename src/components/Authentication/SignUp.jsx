import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      toast.warning("Fill all the fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("https://chatapp-production-31d4.up.railway.app/api/user", { name, email, password }, config);
      toast.success("Sign Up Successfully Done");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chat");
    } catch (error) {
      toast.error("Sign up failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block text-white font-medium">Name</label>
            <input 
              type="text" 
              className="w-full p-3 bg-transparent border border-white/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" 
              placeholder="Enter your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

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

          <div>
            <label className="block text-white font-medium">Confirm Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                className="w-full p-3 bg-transparent border border-white/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" 
                placeholder="Confirm password"
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            type="submit" 
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            disabled={loading} 
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
