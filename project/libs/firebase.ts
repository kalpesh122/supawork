import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import Firebase from 'Firebase/app';
import 'Firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAZ4U_RwqWhPm79vODKEGXg1Si7MTJQk2Y",
    authDomain: "rosetaylor-bba3c.firebaseapp.com",
    projectId: "rosetaylor-bba3c",
    storageBucket: "rosetaylor-bba3c.appspot.com",
    messagingSenderId: "252668162869",
    appId: "1:252668162869:web:14a9aa3166d1ec0762527c",
    measurementId: "G-92JC6EBMCV"
  };







const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;