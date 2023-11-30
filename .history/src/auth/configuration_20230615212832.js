import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA7yoQjF4XlRQrdvjvPh1o_GcGvRrZDVzA",
  authDomain: "auth-ventorify.firebaseapp.com",
  projectId: "auth-ventorify",
  storageBucket: "auth-ventorify.appspot.com",
  messagingSenderId: "243378018074",
  appId: "1:243378018074:web:9a57078366a3547bbafea3",
  measurementId: "G-TR9TK9P4KN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
