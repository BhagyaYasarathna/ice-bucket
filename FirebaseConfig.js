// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0T3n1U1ZP7xEz-j_TsHLbYc_Mk1VDlk0",
    authDomain: "fir-77ad7.firebaseapp.com",
    projectId: "fir-77ad7",
    storageBucket: "fir-77ad7.appspot.com",
    messagingSenderId: "676646037097",
    appId: "1:676646037097:web:02974fccd302f7d616e4f8",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
