import { createAction } from 'redux-actions'
import { GET_TOKEN } from './twilio.constants'
import showToast from '../../helpers/toast.helper'

export const getToken = (identity, roomName) => {
  return async dispatch => {
    try {
      const tokenURL = `https://silver-hawk-9950.twil.io/video-token?identity=${identity}&roomName=${roomName}`
      const res = await fetch(tokenURL)
      const responseValues = await res.json()
      dispatch(createAction(GET_TOKEN)(responseValues.token))
    } catch (error) {
      showToast(error.message)
    }
  }
}
