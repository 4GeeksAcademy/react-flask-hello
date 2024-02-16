// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from"firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCImBsp5xyWfqZUI9-5SDFpKkyCNYfLr_A",
  authDomain: "eventure-7f69d.firebaseapp.com",
  projectId: "eventure-7f69d",
  storageBucket: "eventure-7f69d.appspot.com",
  messagingSenderId: "339520110028",
  appId: "1:339520110028:web:d167f62ad010b3a49a7169",
  measurementId: "G-TCL7LJKFHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { storage }; // Export Firebase Storage