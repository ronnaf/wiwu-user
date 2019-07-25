import { auth, firestore } from '../../firebase'
import { SIGNUP } from './user.constants'
import { statuses, roles } from '../../constants/User'

export function signup(email, password, firstName, lastName, phoneNumber) {
  return async dispatch => {
    try {
      await auth.createUserWithEmailAndPassword(email, password)
      const uid = await auth.currentUser.uid
      const data = {
        firstName,
        lastName,
        email,
        phoneNumber,
        emergencies: [],
        role: roles.USER,
        status: statuses.ACTIVE
      }
      await firestore
        .collection('users')
        .doc(uid)
        .set(data)
      dispatch({
        type: SIGNUP,
        payload: { email: auth.currentUser.email }
      })
      // redirect to next screen
    } catch (e) {
      // handle error (toast)
      console.log(e)
    }
  }
}
