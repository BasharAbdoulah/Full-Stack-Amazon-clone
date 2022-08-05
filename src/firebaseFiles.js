// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDlAbZDu1S_OyyFtsrvf3x5QFF3CXy6ge4",
    authDomain: "clone-7e603.firebaseapp.com",
    projectId: "clone-7e603",
    storageBucket: "clone-7e603.appspot.com",
    messagingSenderId: "976139693515",
    appId: "1:976139693515:web:9d7a666479c7f8ff601a4e",
    measurementId: "G-55MKX63H7B",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
