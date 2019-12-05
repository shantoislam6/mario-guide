 import firebase from 'firebase/app';
 import 'firebase/firestore';
 import 'firebase/auth';
 import 'firebase/firebase-functions'

 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: 'AIzaSyBMkdzI6cd5QoBjf0FcFJG0ps2bGmRp4fw',
  authDomain: "mario-guide.firebaseapp.com",
  databaseURL: "https://mario-guide.firebaseio.com",
  projectId: "mario-guide",
  storageBucket: "mario-guide.appspot.com",
  messagingSenderId: "359405798636",
  appId: "1:359405798636:web:cc885f0f5b17b41c4b91c9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
