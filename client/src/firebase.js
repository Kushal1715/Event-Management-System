// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQjXo3Q45Dax8txII7q_02BFqjyac_W8s",
  authDomain: "mern-blog-4de4a.firebaseapp.com",
  projectId: "mern-blog-4de4a",
  storageBucket: "mern-blog-4de4a.appspot.com",
  messagingSenderId: "943118620511",
  appId: "1:943118620511:web:e102ef972e153b3dc8c8ea"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyB916ASYtflOvxjiVk0y2QnPI5fArtz4OQ",
//   authDomain: "event-management-e1c9a.firebaseapp.com",
//   projectId: "event-management-e1c9a",
//   storageBucket: "event-management-e1c9a.firebasestorage.app",
//   messagingSenderId: "710092940016",
//   appId: "1:710092940016:web:a1673795a85de7bb8a5835"
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);