// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY || "AIzaSyBFs9Ypd68JCh0iNf5Sg28auJH2vwaTKe8",
  authDomain: process.env.FIREBASE_AuthDomain,
  projectId: process.env.FIREBASE_ProjectId,
  storageBucket: process.env.FIREBASE_StorageBucket,
  messagingSenderId: process.env.FIREBASE_MessagingSenderId,
  appId: process.env.FIREBASE_AppId,
  measurementId: process.env.FIREBASE_MeasurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { app, db, auth};