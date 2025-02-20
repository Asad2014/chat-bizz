
// "use client";
// import { useState } from "react";
// import { auth } from "../../firebaseConfig";
// import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
// import { useRouter } from "next/navigation";

// export default function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [resetMessage, setResetMessage] = useState("");
//   const router = useRouter();

//   const handleSignIn = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       router.push("/chatroom"); // Redirect to chatroom after sign in
//     } catch (error: any) {
//       setError(error.message);
//     }
//   };

//   const handleForgotPassword = async () => {
//     if (!email) {
//       setError("Please enter your email to reset password.");
//       return;
//     }
//     try {
//       await sendPasswordResetEmail(auth, email);
//       setResetMessage("Password reset email sent! Check your inbox.");
//       setError("");
//     } catch (error: any) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full">
//         <h1 className="text-3xl font-bold text-center mb-5">Sign In</h1>
//         <form onSubmit={handleSignIn}>
//           <div className="mb-4">
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           {resetMessage && <p className="text-green-500 text-sm">{resetMessage}</p>}

//           <button
//             type="submit"
//             className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//           >
//             Sign In
//           </button>
//         </form>

//         <div className="text-center mt-4">
//           <button
//             onClick={handleForgotPassword}
//             className="text-blue-500 hover:underline"
//           >
//             Forgot Password?
//           </button>
//         </div>

//         <div className="text-center mt-4">
//           <p>
//             Don't have an account?{" "}
//             <button
//               onClick={() => router.push("/signup")}
//               className="text-blue-500 hover:underline"
//             >
//               Sign Up
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import { useState } from "react";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/chatroom");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("Password reset email sent! Check your inbox.");
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-5">Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {resetMessage && <p className="text-green-500 text-sm">{resetMessage}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={handleForgotPassword}
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <div className="text-center mt-4">
          <p>
            Don&apos;t have an account?{" "}
            <button
              onClick={() => router.push("/signup")}
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
