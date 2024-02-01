
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRWdsY_MQReeKMc1UtBOl5fIWYurHFKrE",
  authDomain: "my-app-1d4ff.firebaseapp.com",
  projectId: "my-app-1d4ff",
  storageBucket: "my-app-1d4ff.appspot.com",
  messagingSenderId: "663061994776",
  appId: "1:663061994776:web:4742f8b868a8595242126d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;