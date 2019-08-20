import { auth } from '../../firebase'
import { LOGOUT, SCREEN_LOADING } from './user.constants'
import NavigationService from '../../navigation/NavigationService'
import { createAction } from 'redux-actions'
import ShowToast from '../helpers/toast.helper'

export function logout() {
  return async dispatch => {
    try {
      dispatch(createAction(SCREEN_LOADING)(true))

      await auth.signOut()

      NavigationService.navigate('Auth')
      dispatch(createAction(LOGOUT)())
      dispatch(createAction(SCREEN_LOADING)(false))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      ShowToast(e.message)
    }
  }
}
