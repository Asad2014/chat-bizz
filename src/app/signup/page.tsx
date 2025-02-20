
"use client";
import React, { useState } from "react";
import { auth } from "@/firebaseConfig"; 
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🔹 Handle Email/Password Sign Up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/chatroom");
    } catch (error) {
      console.error("Error signing up:", error);
      setLoading(false);
    }
  };

  // 🔹 Handle Google Sign Up
  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/chatroom");
    } catch (error) {
      console.error("Error signing up with Google:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

        <form onSubmit={handleSignUp}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded-lg mb-4"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded-lg mb-4"
            required
          />
          <button
            type="submit"
            className={`w-full p-2 bg-blue-500 text-white rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="my-4 text-center">
          <span className="text-gray-600">Or</span>
        </div>

        <button
          onClick={handleGoogleSignUp}
          className="w-full p-2 bg-red-500 text-white rounded-lg flex items-center justify-center gap-2"
        >
          <FaGoogle className="text-white" /> Sign Up with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
