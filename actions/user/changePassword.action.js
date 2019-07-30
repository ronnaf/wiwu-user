import { auth } from '../../firebase'
import { CHANGE_PASSWORD, SCREEN_LOADING } from './user.constants'
import { createAction } from 'react-redux'

export function changePassword(email) {
  return async dispatch => {
    try {
      dispatch(createAction(SCREEN_LOADING)(true))
      await auth.sendPasswordResetEmail(email)
      dispatch(createAction(CHANGE_PASSWORD)(email))
      dispatch(createAction(SCREEN_LOADING)(false))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      console.log(e)
    }
  }
}
