import { createAction } from 'redux-actions'
import { auth, firestore } from '../../firebase'
import { LOGIN, SCREEN_LOADING } from './user.constants'
import NavigationService from '../../navigation/NavigationService'
import showToast from '../../helpers/toast.helper'

// To refresh token every login
export function checkUser() {
  return async dispatch => {
    try {
      dispatch(createAction(SCREEN_LOADING)(true))

      auth.onAuthStateChanged(async user => {
        if (user) {
          await user.getIdToken(true)
          await user.reload()

          const userDocument = await firestore
            .collection('users')
            .doc(user.uid)
            .get()
          const userData = userDocument.data()

          dispatch(createAction(LOGIN)({ ...userData, email: user.email }))

          const nav = user.emailVerified ? 'UserHome' : 'Unverified'
          NavigationService.navigate(nav)
          dispatch(createAction(SCREEN_LOADING)(false))
        } else {
          throw new Error('No user is signed in!')
        }
      })
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      showToast(e.message)
    }
  }
}
