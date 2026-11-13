
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey:"AIzaSyAbON2XnW4uJrUJSoo-D-eLdsm7zuzuXYM",
    authDomain: "examprep-97381.firebaseapp.com",
    projectId: "examprep-97381",
    storageBucket: "examprep-97381.firebasestorage.app",
    messagingSenderId: "1087611232786",
    appId: "1:1087611232786:web:437e0652736cd070f96ecb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
