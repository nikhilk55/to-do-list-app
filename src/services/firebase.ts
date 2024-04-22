
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // My Firebase configuration
  apiKey: "AIzaSyALKBkowMuOlj6AM8YJ6AFSAGGNlNsPpXQ",
  authDomain: "to-do-list-by-nikhil.firebaseapp.com",
  projectId: "to-do-list-by-nikhil",
  storageBucket: "to-do-list-by-nikhil.appspot.com",
  messagingSenderId: "122200145322",
  appId: "1:122200145322:web:6e20fa9ef933348f41bfd3",
};

// Initializing Firebase app
const app = initializeApp(firebaseConfig);

// Initializing Firestore
export const db = getFirestore(app);

export const auth = getAuth(app); 



