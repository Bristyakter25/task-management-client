// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLtLrh0soXVBEMyBwfNT7GJcKaOtTu40s",
  authDomain: "task-management-26416.firebaseapp.com",
  projectId: "task-management-26416",
  storageBucket: "task-management-26416.firebasestorage.app",
  messagingSenderId: "405111295350",
  appId: "1:405111295350:web:18e892dbb8d081c779fe57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);