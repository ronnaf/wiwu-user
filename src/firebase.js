import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBwvfQvIxe14wJMbOvSoAGLeaG3t5KSsfM',
  authDomain: 'weewoo-b9408.firebaseapp.com',
  databaseURL: 'https://weewoo-b9408.firebaseio.com',
  projectId: 'weewoo-b9408',
  storageBucket: '',
  messagingSenderId: '363729210043',
  appId: '1:363729210043:web:47b0c446dc062344'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebaseApp.auth()
const firestore = firebaseApp.firestore()
const persistence = firebase.auth.Auth.Persistence

// Initialize Firebase
export { auth, firestore, persistence, firebase }
