import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC3XBFMfOJFm_eSc0dllb20LqdRtGpZ3g4",
  authDomain: "letscoding-92627.firebaseapp.com",
  projectId: "letscoding-92627",
  storageBucket: "letscoding-92627.appspot.com",
  messagingSenderId: "385249045633",
  appId: "1:385249045633:android:f4c067daf1227ad0db7180",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
