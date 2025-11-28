import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCoHzsH7VbGf2wz-wJYo6kFsHYcf5uVLWA",
  authDomain: "storagetutorial-d991d.firebaseapp.com",
  databaseURL: "https://storagetutorial-d991d-default-rtdb.firebaseio.com",
  projectId: "storagetutorial-d991d",
  storageBucket: "storagetutorial-d991d.appspot.com",
  messagingSenderId: "395195483599",
  appId: "1:395195483599:web:6cef081964cb7b57737eba"
});

const db = firebaseConfig.firestore();
const storage = firebaseConfig.storage();

export { db, storage };
