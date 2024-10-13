// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

if(!process.env.REACT_APP_FIREBASE_APIKEY){ 
  console.log("NOT FOUND");
 }
 const firebaseConfig = {
  apiKey: "AIzaSyBFs9Ypd68JCh0iNf5Sg28auJH2vwaTKe8",
  authDomain: "taskbreaker-e6bfa.firebaseapp.com",
  projectId: "taskbreaker-e6bfa",
  storageBucket: "taskbreaker-e6bfa.appspot.com",
  messagingSenderId: "80116200559",
  appId: "1:80116200559:web:88ab8e8cc5172b6cc5499a",
  measurementId: "G-E2YH4ZFVJM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { app, db, auth};