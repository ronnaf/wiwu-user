import { auth } from '../../firebase'
import { LOGIN, SCREEN_LOADING } from './user.constants'
import NavigationService from '../../navigation/NavigationService'
import ShowToast from '../helper/toast.helper'

import { createAction } from 'redux-actions'
import * as SecureStore from 'expo-secure-store'
import jwtDecode from 'jwt-decode'

export function loginUser(email, password) {
  return async dispatch => {
    try {
      dispatch(createAction(SCREEN_LOADING)(true))

      await auth.signInWithEmailAndPassword(email, password)
      await SecureStore.setItemAsync(
        'USER_TOKEN',
        await auth.currentUser.getIdToken()
      )

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

export const checkToken = async dispatch => {
  const token = await SecureStore.getItemAsync('USER_TOKEN')

  if (token) {
    const data = jwtDecode(token)

    if (Date.now() <= data.exp * 1000) {
      dispatch(
        createAction(LOGIN)({
          email: data.email,
          uid: data.user_id
        })
      )
      NavigationService.navigate('Home')
    } else {
      await SecureStore.deleteItemAsync('USER_TOKEN')
    }
  }
}
