import { API_KEY } from 'react-native-dotenv'
import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/messaging'

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'weewoo-b9408.firebaseapp.com',
  databaseURL: 'https://weewoo-b9408.firebaseio.com',
  projectId: 'weewoo-b9408',
  storageBucket: 'gs://weewoo-b9408.appspot.com/',
  messagingSenderId: '363729210043',
  appId: '1:363729210043:web:47b0c446dc062344'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebaseApp.auth()
const firestore = firebaseApp.firestore()
const storage = firebaseApp.storage()
const persistence = firebase.auth.Auth.Persistence

// Initialize Firebase
export { auth, firestore, storage, persistence, firebase }
