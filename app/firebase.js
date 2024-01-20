// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //not disclosing
  apiKey: "AIzaSyAcLQD7SQtioC4B-JFAY8khoeu7VwWXCJ4",
  authDomain: "expense-tracker-4fe5f.firebaseapp.com",
  projectId: "expense-tracker-4fe5f",
  storageBucket: "expense-tracker-4fe5f.appspot.com",
  messagingSenderId: "116805592700",
  appId: "1:116805592700:web:963311caefd90803c38bf9",
  measurementId: "G-9X9CNL7TDQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
