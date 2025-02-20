
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: "AIzaSyCOSsdXkVNnBNXZh6TxjRdHfw-5CN8cu0c",
  authDomain: "chat-app-dc6ac.firebaseapp.com",
  projectId: "chat-app-dc6ac",
  storageBucket: "chat-app-dc6ac.firebasestorage.app",
  messagingSenderId: "233271679403",
  appId: "1:233271679403:web:e830629967567480a05aee",
  measurementId: "G-RW53117QK1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { auth, }; 

