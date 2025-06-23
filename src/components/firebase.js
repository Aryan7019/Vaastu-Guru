// Import required Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Add Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYuiAj1AbWB04F0iU1HaFmZP6VIZyIv6U",
  authDomain: "bhaggya-darshhan.firebaseapp.com",
  projectId: "bhaggya-darshhan",
  storageBucket: "bhaggya-darshhan.firebasestorage.app",
  messagingSenderId: "233513586592",
  appId: "1:233513586592:web:9792f06f7203b13e2ddec5",
  measurementId: "G-1JRYDMJSWK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ Export Firestore
