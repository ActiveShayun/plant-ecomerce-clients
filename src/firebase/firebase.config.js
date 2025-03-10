
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCLxNvgHgEIDabsPPyhLI9YUXgRB9vbecw",
//   authDomain: "planet-auth-88472.firebaseapp.com",
//   projectId: "planet-auth-88472",
//   storageBucket: "planet-auth-88472.firebasestorage.app",
//   messagingSenderId: "512590212015",
//   appId: "1:512590212015:web:aca3ad0f0babe05c3a5d5a"
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth

