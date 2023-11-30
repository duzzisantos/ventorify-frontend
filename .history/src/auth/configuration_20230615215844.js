// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNA3KkZIrm-QDnK2fL7FCmQX2YTZv4Ps4",
  authDomain: "auth-ventorify-ccee8.firebaseapp.com",
  projectId: "auth-ventorify-ccee8",
  storageBucket: "auth-ventorify-ccee8.appspot.com",
  messagingSenderId: "434488772803",
  appId: "1:434488772803:web:3152152ab896cf9b40fa76",
  measurementId: "G-L1X3TQFSM8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

console.log(db);
