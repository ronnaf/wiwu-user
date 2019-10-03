import { createAction } from 'redux-actions'
import { JOINED_VIDEO } from '../twilio/twilio.constants'
import { auth, firestore } from '../../firebase'
import showToast from '../../helpers/toast.helper'

export const setJoinedRoom = value => {
  return async dispatch => {
    try {
      const { uid } = auth.currentUser
      await firestore
        .collection('users')
        .doc(uid)
        .update({ joinedRoom: value })
      dispatch(createAction(JOINED_VIDEO)(value))
    } catch (error) {
      console.log('error', value)
      showToast(error.message)
    }
  }
}
