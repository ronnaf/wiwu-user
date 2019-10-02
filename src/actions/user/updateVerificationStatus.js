import { createAction } from 'redux-actions'
import { UPDATE_VERIFICATION_STATUS } from './user.constants'
import showToast from '../../helpers/toast.helper'

export const updateVerificationStatus = status => {
  return dispatch => {
    try {
      dispatch(createAction(UPDATE_VERIFICATION_STATUS)(status))
      showToast('Your account status has been verified!')
    } catch (error) {
      showToast(error.message)
    }
  }
}
