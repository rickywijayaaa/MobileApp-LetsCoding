// src/services/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBALSZZKM6dYZTM2Ijgyq19XF_nFvKf0bk",
    authDomain: "letscoding-92627.firebaseapp.com",
    projectId: "letscoding-92627",
    storageBucket: "letscoding-92627.firebasestorage.app",
    messagingSenderId: "385249045633",
    appId: "1:385249045633:web:fb2f8cd7b94a0d24db7180",
    measurementId: "G-THFMJPPJR1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app)