import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDK_26kz21ut9E4zUWUFgN8H8mJooiFZrs",
  authDomain: "list-member-3a54e.firebaseapp.com",
  projectId: "list-member-3a54e",
  storageBucket: "list-member-3a54e.appspot.com",
  messagingSenderId: "49705127349",
  appId: "1:49705127349:web:a030b188951e36e2d9ddfc",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
