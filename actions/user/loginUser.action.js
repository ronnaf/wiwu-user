import { auth, persistence, firestore } from '../../firebase'
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

    NavigationService.navigate(
      currentUser.emailVerified ? 'Home' : 'Unverified'
    )
  }

  dispatch(createAction(SCREEN_LOADING)(false))
}
