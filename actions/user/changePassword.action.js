import { auth } from '../../firebase'
import { CHANGE_PASSWORD } from './user.constants'

export function changePassword(email) {
  return async dispatch => {
    try {
      await auth.sendPasswordResetEmail(email)
      dispatch({
        type: CHANGE_PASSWORD,
        payload: { email }
      })
    } catch (e) {
      console.log(e)
    }
  }
}
