import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDsppvErU8JtA-lmQaNQcEuOYzHs20mGn4",
  authDomain: "reactnetflixclone-b6e3f.firebaseapp.com",
  projectId: "reactnetflixclone-b6e3f",
  storageBucket: "reactnetflixclone-b6e3f.firebasestorage.app",
  messagingSenderId: "744676513414",
  appId: "1:744676513414:web:525d9ccbed298936926307",
  };

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
