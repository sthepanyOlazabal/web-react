import * as firebase from "firebase";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCDgXT1szDAJ8wGtWOwhJUP3TsHN8gRzI",
  authDomain: "webreact-34135.firebaseapp.com",
  databaseURL: "https://webreact-34135.firebaseio.com",
  projectId: "webreact-34135",
  storageBucket: "webreact-34135.appspot.com",
  messagingSenderId: "270172626063",
  appId: "1:270172626063:web:3c930621808a7505d4a4fa",
  measurementId: "G-P11C5FPWQW",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.firestore();
export const auth = firebase.auth();
