import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDvtwFBttf0vOZCA7ZsPEZY4c7l2KCZKmo",
    authDomain: "autoguardalertsystem.firebaseapp.com",
    databaseURL: "https://autoguardalertsystem-default-rtdb.firebaseio.com",
    projectId: "autoguardalertsystem",
    storageBucket: "autoguardalertsystem.firebasestorage.app",
    messagingSenderId: "775343753724",
    appId: "1:775343753724:web:db680d85cfb9c2ef5e0a79"
  };

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const database = firebase.database();