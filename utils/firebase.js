import firebase from 'firebase/app'
import 'firebase/firestore'

  const firebaseConfig = {
    apiKey: "AIzaSyDsAfq9V13827lEvDQ2wIrzniAlLn-LygA",
    authDomain: "restaurants-547b3.firebaseapp.com",
    projectId: "restaurants-547b3",
    storageBucket: "restaurants-547b3.appspot.com",
    messagingSenderId: "51068162361",
    appId: "1:51068162361:web:1d610a8a7f69261ae618e8"
  }

  export const firebaseApp = firebase.initializeApp(firebaseConfig)