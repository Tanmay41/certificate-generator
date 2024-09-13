// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAm2DCj1l0yxMNfh2SiIGsB63aIp3c2JFU",
  authDomain: "certificate-generator-d5fd4.firebaseapp.com",
  projectId: "certificate-generator-d5fd4",
  storageBucket: "certificate-generator-d5fd4.appspot.com",
  messagingSenderId: "499790189926",
  appId: "1:499790189926:web:53a51abc9554678cce24a7",
  measurementId: "G-B7M2G5L1NK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; // Export Firestore
