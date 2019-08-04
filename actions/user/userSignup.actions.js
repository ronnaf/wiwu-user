import { auth, firestore } from '../../firebase'
import { SIGNUP, SCREEN_LOADING } from './user.constants'
import { statuses, roles } from '../../constants/User'
import NavigationService from '../../navigation/NavigationService'
import { createAction } from 'redux-actions'
import ShowToast from '../helper/toast.helper'

export function signup(email, password, firstName, lastName, phoneNumber) {
  return async dispatch => {
    try {
      dispatch(createAction(SCREEN_LOADING)(true))
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
      dispatch(createAction(SIGNUP)({ email: auth.currentUser.email, uid }))
      NavigationService.navigate('Login')
      dispatch(createAction(SCREEN_LOADING)(false))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      ShowToast(e.message)
    }
  }
}
