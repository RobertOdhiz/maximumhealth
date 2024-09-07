import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJU2e_OLdLHu1H1uxoaz22OqGqqRm1wis",
  authDomain: "maxhealth-ke.firebaseapp.com",
  projectId: "maxhealth-ke",
  storageBucket: "maxhealth-ke.appspot.com",
  messagingSenderId: "977705859993",
  appId: "1:977705859993:web:31e61db98d2c167aa23108",
  measurementId: "G-K787TJ9ZCY"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const analytics = getAnalytics(app)
const db = getFirestore(app)

export default {auth, analytics, db}