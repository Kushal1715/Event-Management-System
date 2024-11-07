// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-4de4a.firebaseapp.com",
  projectId: "mern-blog-4de4a",
  storageBucket: "mern-blog-4de4a.appspot.com",
  messagingSenderId: "943118620511",
  appId: "1:943118620511:web:0c3f7a1bd3ad98d6c8c8ea"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);