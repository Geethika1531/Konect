import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkaKR3PJDVtYdmNYXM4ZVSsWU4eG9Ptsg",
  authDomain: "konekt-7olwj.firebaseapp.com",
  projectId: "konekt-7olwj",
  storageBucket: "konekt-7olwj.firebasestorage.app",
  messagingSenderId: "1059786944106",
  appId: "1:1059786944106:web:9a740d42c6101772d12413"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };

