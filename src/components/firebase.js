// Import required Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Add Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEkHEv31lTHHEMAyD2EJCMvZNXrtLd4Pw",
  authDomain: "vaastu-guru.firebaseapp.com",
  projectId: "vaastu-guru",
  storageBucket: "vaastu-guru.firebasestorage.app",
  messagingSenderId: "1014806685724",
  appId: "1:1014806685724:web:500d11f3252c1a080cd7d9",
  measurementId: "G-ZYCD6R3GJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ Export Firestore
