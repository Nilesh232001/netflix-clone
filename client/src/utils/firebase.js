// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsppvErU8JtA-lmQaNQcEuOYzHs20mGn4",
  authDomain: "reactnetflixclone-b6e3f.firebaseapp.com",
  projectId: "reactnetflixclone-b6e3f",
  storageBucket: "reactnetflixclone-b6e3f.firebasestorage.app",
  messagingSenderId: "744676513414",
  appId: "1:744676513414:web:525d9ccbed298936926307",
  measurementId: "G-WSSXQ2PYSL"
};



const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
