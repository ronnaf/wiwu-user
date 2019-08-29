import { auth } from '../../firebase'
import { LOGOUT, SCREEN_LOADING, WIWU_USER_INFO } from './user.constants'
import NavigationService from '../../navigation/NavigationService'
import showToast from '../../helpers/toast.helper'

import { createAction } from 'redux-actions'
import * as SecureStore from 'expo-secure-store'

export function logout() {
  return async dispatch => {
    try {
      dispatch(createAction(SCREEN_LOADING)(true))

      await auth.signOut()
      await SecureStore.deleteItemAsync(WIWU_USER_INFO)

      NavigationService.navigate('Auth')
      dispatch(createAction(LOGOUT)())
      dispatch(createAction(SCREEN_LOADING)(false))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      showToast(e.message)
    }
  }
}
