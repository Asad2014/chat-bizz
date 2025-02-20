// "use client";
// import { signOut } from "firebase/auth";
// import { auth } from "@/firebaseConfig"; // ✅ Import Firebase Auth
// import { useRouter } from "next/navigation";

// export default function LogoutButton() {
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       await signOut(auth); // 🔥 Logout user
//       router.push("/signin"); // 🔄 Redirect to Sign In page
//     } catch (error: any) {
//       console.error("Logout Error:", error.message);
//     }
//   };

//   return (
//     <button
//       onClick={handleLogout}
//       className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
//     >
//       Logout
//     </button>
//   );
// }



"use client";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/signin");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Logout Error:", error.message);
      } else {
        console.error("An unknown error occurred during logout.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
