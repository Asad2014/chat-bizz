// "use client"; 
// import { useEffect } from "react";
// import { signOut } from "firebase/auth";
// import { auth } from "@/firebaseConfig"; 
// import { useRouter } from "next/navigation";

// export default function LogoutPage() {
//   const router = useRouter();

//   useEffect(() => {
//     const logoutUser = async () => {
//       try {
//         await signOut(auth); // 🔥 Firebase Logout
//         router.push("/signin"); // 🔄 Redirect to Sign In page
//       } catch (error: any) {
//         console.error("Logout Error:", error.message);
//       }
//     };

//     logoutUser();
//   }, [router]);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <p className="text-lg font-semibold text-gray-700">Logging out...</p>
//     </div>
//   );
// }




"use client"; 
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig"; 
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    signOut(auth).then(() => router.push("/signin"));
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg font-semibold text-gray-700">Logging out...</p>
    </div>
  );
}
