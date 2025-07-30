// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0bkQ18ThFl7dMM5nHMDddlCslEIihta0",
  authDomain: "netflixgpt-64146.firebaseapp.com",
  projectId: "netflixgpt-64146",
  storageBucket: "netflixgpt-64146.firebasestorage.app",
  messagingSenderId: "733725588460",
  appId: "1:733725588460:web:7302b92758de8f1605dec9",
  measurementId: "G-E80C34KSL8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
