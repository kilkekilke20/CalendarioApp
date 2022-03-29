import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
 
 
const firebaseConfig = {
  apiKey: "AIzaSyBEXT9i7V3FkxGSRU3RozUG3H2bRCkVZGo",
  authDomain: "react-app-cursos-b54aa.firebaseapp.com",
  projectId: "react-app-cursos-b54aa",
  storageBucket: "react-app-cursos-b54aa.appspot.com",
  messagingSenderId: "816258861018",
  appId: "1:816258861018:web:db85e12a9a1bc3ddfaa2e3",
  measurementId: "G-C53BSVRSCW"
};
 
initializeApp(firebaseConfig);
 
 
const db = getFirestore();
 
const googleAuthProvider = new GoogleAuthProvider();
 
export{
    db,
    googleAuthProvider
}