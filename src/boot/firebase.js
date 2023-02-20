import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0uC0pwdJiYG27FeUtg4D3OmJ0PMr5NAk",
  authDomain: "britter-30060.firebaseapp.com",
  projectId: "britter-30060",
  storageBucket: "britter-30060.appspot.com",
  messagingSenderId: "69270402300",
  appId: "1:69270402300:web:744b8076eb8b7270a21379",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
