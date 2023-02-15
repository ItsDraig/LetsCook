// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, collection, addDoc, getDocs } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsJy9ZN6wIhL4H2a-eK2F-5LqQnEsZUYc",
  authDomain: "let-s-cook-1e80d.firebaseapp.com",
  projectId: "let-s-cook-1e80d",
  storageBucket: "let-s-cook-1e80d.appspot.com",
  messagingSenderId: "66000057218",
  appId: "1:66000057218:web:591da1bd9ca34a2446d59b",
  measurementId: "G-KRLFEQJL80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db: any) {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc: { data: () => any; }) => doc.data());
    return cityList;
}