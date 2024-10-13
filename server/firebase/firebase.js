// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import dotenv from 'dotenv';

dotenv.config();
const FIREBASE_APIKEY = process.env.FIREBASE_APIKEY;
const AUTH_DOMAIN = process.env.AUTH_DOMAIN;
const PROJECT_ID = process.env.PROJECT_ID;
const STORAGE_BUCKET = process.env.PROJECT_ID;
const MESSAGING_SENDER_ID = process.env.MESSAGING_SENDER_ID;
const APP_ID = process.env.APP_ID;
const MEASURE_ID = process.env.MEASURE_ID;


if(!FIREBASE_APIKEY){ 
  console.log("NOT FOUND");
}

 const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASURE_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { app, db, auth};