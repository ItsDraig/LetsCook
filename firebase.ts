// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, SnapshotOptions, doc, getDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { RecipeCard } from "./RecipeCard";
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
const analytics = getAnalytics(app);        // Google Analytics
const db = getFirestore(app);               // Cloud Firestore Database
const auth = getAuth(app);                  // User Authentication

const email = "test";
const password = "pass";

// Checks if there is a currently signed in user
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

// Signs out a user
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});

// Creates a new user profile from username and password
// TODO: Verify fields
createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  // Signed in 
  const user = userCredential.user;
  // ...
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  // ..
});

// Signs in user from username and password
// TODO: Verify fields
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

// Gets a list of recipes all from the database
export async function GetRecipes() {
  const recipeList: RecipeCard[] = [];
  const ref = collection(db, 'recipes').withConverter(recipeConverter);
  const querySnapshot = await getDocs(ref);
  querySnapshot.forEach((doc) => {
    const recipe = doc.data();
    recipeList.push(recipe);
    console.log(recipe.name);
  });
  return recipeList;
}

// Adds a new recipe to the database
export async function AddRecipe(newRecipe: RecipeCard) {
  try {
    const docRef = await addDoc(collection(db, 'recipes'), {
      name: newRecipe.name,
      thumbnail: newRecipe.thumbnail,
      preptime: newRecipe.preptime,
      cooktime: newRecipe.cooktime,
      totaltime: newRecipe.totaltime,
      servings: newRecipe.servings,
      images: newRecipe.images,
      ingredients: newRecipe.ingredients,
      instructions: newRecipe.instructions,
      tags: newRecipe.tags
    });
    console.log("Recipe added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding recipe: ", e);
  }
}

// RecipeCard converter function for Firestore
const recipeConverter = {
  toFirestore(recipe: RecipeCard): DocumentData {
    return {
      name: recipe.name,
      thumbnail: recipe.thumbnail,
      preptime: recipe.preptime,
      cooktime: recipe.cooktime,
      totaltime: recipe.totaltime,
      servings: recipe.servings,
      images: recipe.images,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      tags: recipe.tags
    }
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return new RecipeCard(data.name, data.thumbnail, data.preptime, data.cooktime, data.totaltime, data.servings, data.images, data.ingredients, data.instructions, data.tags);
  }
};