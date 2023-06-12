// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_NATIVE_APP_apiKey,
//   authDomain: process.env.REACT_NATIVE_APP_authDomain,
//   projectId: process.env.REACT_NATIVE_APP_projectId,
//   storageBucket: process.env.REACT_NATIVE_APP_storageBucket,
//   messagingSenderId: process.env.REACT_NATIVE_APP_messagingSenderId,
//   appId: process.env.REACT_NATIVE_APP_appId,
// };
const firebaseConfig = {
  apiKey: "AIzaSyCF19e5159Crfxa1xgHfPaeEdv7UCfYAfA",
  authDomain: "tricky-task.firebaseapp.com",
  projectId: "tricky-task",
  storageBucket: "tricky-task.appspot.com",
  messagingSenderId: "439802159417",
  appId: "1:439802159417:web:98f053f134845d4b55c8e8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
