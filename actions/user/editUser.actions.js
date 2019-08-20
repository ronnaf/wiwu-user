import { createAction } from 'redux-actions'

import { auth, firestore } from '../../firebase'
import { SCREEN_LOADING, EDIT } from './user.constants'
import NavigationService from '../../navigation/NavigationService'
import ShowToast from '../helper/toast.helper'

export function editUser(user) {
  return async dispatch => {
    try {
      dispatch(createAction(SCREEN_LOADING)(true))

      const uid = await auth.currentUser.uid
      delete user.email

      await firestore
        .collection('users')
        .doc(uid)
        .update(user)

      dispatch(createAction(EDIT)(user))
      NavigationService.navigate('Home')
      dispatch(createAction(SCREEN_LOADING)(false))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      ShowToast(e.message)
    }
  }
}
