import { auth, firestore } from '../../firebase'
import { SIGNUP } from './user.constants'
import { statuses, roles } from '../../constants/User'
import NavigationService from '../../navigation/NavigationService'

export function signup(email, password, firstName, lastName, phoneNumber) {
  return async dispatch => {
    try {
      await auth.createUserWithEmailAndPassword(email, password)
      const uid = await auth.currentUser.uid
      const data = {
        firstName,
        lastName,
        phoneNumber,
        emergencies: [],
        role: roles.USER,
        status: statuses.ACTIVE
      }
      await firestore
        .collection('users')
        .doc(uid)
        .set(data)
      // TODO: handle redirect upon verification
      await auth.currentUser.sendEmailVerification()
      dispatch({
        type: SIGNUP,
        payload: { email: auth.currentUser.email }
      })
      NavigationService.navigate('Login')
    } catch (e) {
      // TODO: handle error (toast)
      console.log(e)
    }
  }
}
