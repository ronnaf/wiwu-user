import { createAction } from 'redux-actions'
import { RESET_TOKEN } from './twilio.constants'
import showToast from '../../helpers/toast.helper'

export const resetToken = () => {
  return dispatch => {
    try {
      dispatch(createAction(RESET_TOKEN)())
    } catch (error) {
      showToast(error.message)
    }
  }
}
