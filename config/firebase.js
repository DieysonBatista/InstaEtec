// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqgrYQ7u6t-zuFE7fmRB2yJ7kiaWqerkw",
  authDomain: "instaetec-e686c.firebaseapp.com",
  databaseURL: "https://instaetec-e686c-default-rtdb.firebaseio.com",
  projectId: "instaetec-e686c",
  storageBucket: "instaetec-e686c.appspot.com",
  messagingSenderId: "741125292376",
  appId: "1:741125292376:web:5e532a4dc56ec51fe7652d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;