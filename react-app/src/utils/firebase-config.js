// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlgOpc3Pc_UyBe8SIcRLOiPaVGJp5McbA",
  authDomain: "react-7ad16.firebaseapp.com",
  projectId: "react-7ad16",
  storageBucket: "react-7ad16.appspot.com",
  messagingSenderId: "458810906117",
  appId: "1:458810906117:web:0918684daf3c43e3192e6c",
  measurementId: "G-SPTLFGXLNF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);