import { auth } from '../../firebase'
import NavigationService from '../../navigation/NavigationService'
import showToast from '../../helpers/toast.helper'
import { SCREEN_LOADING, VERIFY } from '../user/user.constants'

import { createAction } from 'redux-actions'

export const verifyUser = () => {
  return async dispatch => {
    try {
      dispatch(createAction(SCREEN_LOADING)(true))

      if (auth.currentUser) {
        // To refresh token every login
        await auth.currentUser.getIdToken(true)
        const user = auth.currentUser

        if (user.emailVerified) {
          NavigationService.navigate('UserHome')
          dispatch(createAction(VERIFY)(user.emailVerified))
        } else {
          showToast('User is not verified')
        }
        NavigationService.navigate(
          user.emailVerified ? 'UserHome' : 'Unverified'
        )
      }

      dispatch(createAction(SCREEN_LOADING)(false))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      console.log('[!] ERR - verifyUser -', e)
      showToast(e.message)
    }
  }
}
