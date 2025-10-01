import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyCd3g9lOws2rZB2qcCQKlZe_zYuOquPsc4",
  authDomain: "movie-app-deff2.firebaseapp.com",
  projectId: "movie-app-deff2",
  storageBucket: "movie-app-deff2.firebasestorage.app",
  messagingSenderId: "713549714849",
  appId: "1:713549714849:web:bf30c892c07802bd4b27e0",
  measurementId: "G-ZTP5L860ND"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
