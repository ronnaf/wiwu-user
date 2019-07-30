import { auth } from '../../firebase'
import { LOGIN, SCREEN_LOADING } from './user.constants'
import NavigationService from '../../navigation/NavigationService'
import { createAction } from 'redux-actions'
import ShowToast from '../helper/toast.helper'

export function loginUser(email, password) {
  return async dispatch => {
    try {
      dispatch(createAction(SCREEN_LOADING)(true))
      await auth.signInWithEmailAndPassword(email, password)
      dispatch(createAction(LOGIN)({ email: auth.currentUser.email }))
      NavigationService.navigate('UserHome')
      dispatch(createAction(SCREEN_LOADING)(false))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      ShowToast(e.message)
    }
  }
}
