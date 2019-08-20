import { createAction } from 'redux-actions'

import { capitalize } from '../helper/capitalize.helper'
import { auth, firestore } from '../../firebase'
import { SCREEN_LOADING, EDIT } from './user.constants'
import NavigationService from '../../navigation/NavigationService'
import ShowToast from '../helper/toast.helper'

export function editUser(user) {
  return async dispatch => {
    try {
      dispatch(createAction(SCREEN_LOADING)(true))

      user.firstName = capitalize(user.firstName)
      user.lastName = capitalize(user.lastName)

      const uid = await auth.currentUser.uid
      // dont send email field
      const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber
      }

      await firestore
        .collection('users')
        .doc(uid)
        .update(data)

      dispatch(createAction(EDIT)(user))
      NavigationService.navigate('UserHome')
      dispatch(createAction(SCREEN_LOADING)(false))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      ShowToast(e.message)
    }
  }
}
