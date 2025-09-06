// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyAH87ulQrRi-NAAsp2ZoIb1GB3Wvc6DsQs",
  authDomain: "dbingeconomica.firebaseapp.com",
  projectId: "dbingeconomica",
  storageBucket: "dbingeconomica.firebasestorage.app",
  messagingSenderId: "621733072241",
  appId: "1:621733072241:web:2cb3a27fd995a44f18bad0",
  measurementId: "G-XGEQ214HBS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 