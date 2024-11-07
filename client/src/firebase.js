// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "event-management-e1c9a.firebaseapp.com",
  projectId: "event-management-e1c9a",
  storageBucket: "event-management-e1c9a.firebasestorage.app",
  messagingSenderId: "710092940016",
  appId: "1:710092940016:web:a1673795a85de7bb8a5835"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);