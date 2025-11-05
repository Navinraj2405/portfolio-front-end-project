
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxiwelMiYJlG4rFPU2hs8leln9l-sJYs8",
  authDomain: "my-portfolio-c3c1f.firebaseapp.com",
  projectId: "my-portfolio-c3c1f",
  storageBucket: "my-portfolio-c3c1f.firebasestorage.app",
  messagingSenderId: "855198830317",
  appId: "1:855198830317:web:629e471415c7ed50c106e4",
  measurementId: "G-69HTGZ264M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;


