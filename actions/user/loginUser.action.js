import { auth, persistence } from '../../firebase'
import { LOGIN, SCREEN_LOADING } from './user.constants'
import NavigationService from '../../navigation/NavigationService'
import ShowToast from '../helper/toast.helper'

import { createAction } from 'redux-actions'

export function loginUser(email, password) {
  return async dispatch => {
    try {
      dispatch(createAction(SCREEN_LOADING)(true))

      await auth.setPersistence(persistence.LOCAL)
      await auth.signInWithEmailAndPassword(email, password)

      dispatch(
        createAction(LOGIN)({
          email: auth.currentUser.email,
          uid: auth.currentUser.uid
        })
      )
      NavigationService.navigate('User')
      dispatch(createAction(SCREEN_LOADING)(false))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      ShowToast(e.message)
    }
  }
}

export const checkUser = async dispatch => {
  // To refresh token every login
  dispatch(createAction(SCREEN_LOADING)(true))

  if (auth.currentUser) {
    await auth.currentUser.getIdToken(true)
    await auth.currentUser.reload()
    const user = auth.currentUser

    dispatch(
      createAction(LOGIN)({
        email: user.email,
        uid: user.uid
      })
    )

    NavigationService.navigate(user.emailVerified ? 'Home' : 'Unverified')
  }

  dispatch(createAction(SCREEN_LOADING)(false))
}
