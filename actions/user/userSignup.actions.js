import { createAction } from 'redux-actions'

import { auth, firestore } from '../../firebase'
import { SIGNUP, SCREEN_LOADING } from './user.constants'
import { statuses, roles } from '../../constants/User'
import NavigationService from '../../navigation/NavigationService'
import ShowToast from '../helper/toast.helper'

export function signup(user) {
  return async dispatch => {
    try {
      const { email, password, firstName, lastName, phoneNumber } = user
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
      await auth.currentUser.sendEmailVerification()

      dispatch(createAction(SIGNUP)({ email: auth.currentUser.email, uid }))
      NavigationService.navigate('Unverified')
      dispatch(createAction(SCREEN_LOADING)(false))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      ShowToast(e.message)
    }
  }
}
