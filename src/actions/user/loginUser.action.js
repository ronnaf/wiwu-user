import { auth, persistence, firestore } from '../../firebase'
import { LOGIN, SCREEN_LOADING } from './user.constants'
import NavigationService from '../../navigation/NavigationService'
import showToast from '../../helpers/toast.helper'

import { createAction } from 'redux-actions'

export function loginUser(email, password) {
  return async dispatch => {
    try {
      dispatch(createAction(SCREEN_LOADING)(true))

      await auth.setPersistence(persistence.LOCAL)
      await auth.signInWithEmailAndPassword(email, password)

      const currentUser = auth.currentUser
      const user = await firestore
        .collection('users')
        .doc(currentUser.uid)
        .get()
      const data = user.data()

      dispatch(
        createAction(LOGIN)({
          ...data,
          email: currentUser.email
        })
      )

      const nav = currentUser.emailVerified ? 'UserHome' : 'Unverified'
      NavigationService.navigate(nav)
      dispatch(createAction(SCREEN_LOADING)(false))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      showToast(e.message)
    }
  }
}
