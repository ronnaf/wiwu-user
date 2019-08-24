import { createAction } from 'redux-actions'

import { auth, firestore } from '../../firebase'
import { LOGIN, SCREEN_LOADING } from './user.constants'
import NavigationService from '../../navigation/NavigationService'
import showToast from '../../helpers/toast.helper'

// To refresh token every login
export function checkUser() {
  return async (dispatch, getState) => {
    try {
      const {
        user: {
          netInfo: {
            type,
            effectiveType // not sure if we should restrict use of this apps online features if 4g lang, too long mag load if indi
          },
          current: { isVerified }
        }
      } = getState()

      dispatch(createAction(SCREEN_LOADING)(true))

      if (type === 'offline' && isVerified) {
        NavigationService.navigate('UserHome')
      }

      // Auto unsubscribes if no net so no need to worry
      auth.onAuthStateChanged(async user => {
        // function inside this listener will not be caught by outer try catch
        try {
          if (user) {
            dispatch(createAction(SCREEN_LOADING)(true))

            await user.getIdToken(true)

            const userDocument = await firestore
              .collection('users')
              .doc(user.uid)
              .get()
            const userData = userDocument.data()

            dispatch(
              createAction(LOGIN)({
                ...userData,
                email: user.email,
                isVerified: user.emailVerified
              })
            )

            const nav = user.emailVerified ? 'UserHome' : 'Unverified'
            NavigationService.navigate(nav)
            dispatch(createAction(SCREEN_LOADING)(false))
          }
        } catch (e) {
          dispatch(createAction(SCREEN_LOADING)(false))
          showToast(e.message)
        }
      })
      dispatch(createAction(SCREEN_LOADING)(false))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      showToast(e.message)
    }
  }
}
