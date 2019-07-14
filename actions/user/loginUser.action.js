import { auth } from '../../firebase'
import { LOGIN } from './user.constants'

export function loginUser(email, password) {
  return async dispatch => {
    // TODO add try catch
    await auth.signInWithEmailAndPassword(email, password)
    dispatch({
      type: LOGIN,
      payload: { email: auth.currentUser.email }
    })
  }
}
