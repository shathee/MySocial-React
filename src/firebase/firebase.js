import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBpEmGRoBvZ_BqVS-RoRnfbaBrQZBPlT5g",
    authDomain: "mysocial-f0589.firebaseapp.com",
    projectId: "mysocial-f0589",
    storageBucket: "mysocial-f0589.appspot.com",
    messagingSenderId: "939125916697",
    appId: "1:939125916697:web:87b95dce5373886f3ed688",
    measurementId: "G-JC4EMGMF94"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
// const firebaseAnalytics = firebase.analytics();

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();


export {db, auth, provider, storage};