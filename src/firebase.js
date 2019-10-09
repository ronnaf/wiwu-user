import { API_KEY } from 'react-native-dotenv'
import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'wiwu-48f9e.firebaseapp.com',
  databaseURL: 'https://wiwu-48f9e.firebaseio.com',
  projectId: 'wiwu-48f9e',
  storageBucket: 'wiwu-48f9e.appspot.com',
  messagingSenderId: '900668914554',
  appId: '1:900668914554:web:90b417061296d685e674c3',
  measurementId: 'G-55KP1BV024'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebaseApp.auth()
const firestore = firebaseApp.firestore()
const storage = firebaseApp.storage()
const persistence = firebase.auth.Auth.Persistence

// Initialize Firebase
export { auth, firestore, storage, persistence, firebase }
