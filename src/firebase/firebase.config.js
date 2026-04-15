// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz9A2vmeSAtmZBnHg6zKNKyW1qoD_J8W0",
  authDomain: "smart-deals-3a6c1.firebaseapp.com",
  projectId: "smart-deals-3a6c1",
  storageBucket: "smart-deals-3a6c1.firebasestorage.app",
  messagingSenderId: "202166043666",
  appId: "1:202166043666:web:8828f0557891796bb684cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)