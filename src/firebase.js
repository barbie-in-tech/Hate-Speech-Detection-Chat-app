import firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBzGRCmvUadWrYyS5DEbyVa_5NFzpcTA0",
  authDomain: "chat-app-a3a8c.firebaseapp.com",
  projectId: "chat-app-a3a8c",
  storageBucket: "chat-app-a3a8c.appspot.com",
  messagingSenderId: "599657384889",
  appId: "1:599657384889:web:2f60bb0d3d22e56122c468",
  measurementId: "G-308WWLMC8C"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore(); 
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;