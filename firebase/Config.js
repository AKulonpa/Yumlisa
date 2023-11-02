import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs} from 'firebase/firestore';

const firebaseConfig = {
apiKey: "AIzaSyCbQw9qTQ-do8chwXFu44-wN32SpmWDpdI",
  authDomain: "yumlisa.firebaseapp.com",
  projectId: "yumlisa",
  storageBucket: "yumlisa.appspot.com",
  messagingSenderId: "652442867449",
  appId: "1:652442867449:web:3ba4f85cc18638097e3428"
};


const app = initializeApp(firebaseConfig);
const firestore = getFirestore();
const recipesCollection = collection(firestore, "recipes");

export {
  firestore,
  collection,
  addDoc,
  getDocs
};