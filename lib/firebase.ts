// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-pGQs0uI3oFWmX2_ZyxkMZSkE74jkOLU",
  authDomain: "study-twin.firebaseapp.com",
  projectId: "study-twin",
  storageBucket: "study-twin.firebasestorage.app",
  messagingSenderId: "47046253928",
  appId: "1:47046253928:web:a76b9a1fbc0ae5712d8add",
  measurementId: "G-XSL2ZBP2N3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);