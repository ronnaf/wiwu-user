import { firestore } from '../../firebase'
import { SCREEN_LOADING } from '../user/user.constants'
import { GET_ALL_EMERGENCIES } from './emergency.constants'
import showToast from '../../helpers/toast.helper'

import { createAction } from 'redux-actions'

export function getEmergencies() {
  return async dispatch => {
    try {
      dispatch(createAction(SCREEN_LOADING)(true))

      const emergencyRef = await firestore
        .collection('emergencies')
        .where('status', '==', 'PENDING')
        .get()

      const emergencies = emergencyRef.docs.map(e => {
        const data = e.data()
        return { id: e.id, location: data.location }
      })

      dispatch(createAction(GET_ALL_EMERGENCIES)(emergencies))
      dispatch(createAction(SCREEN_LOADING)(false))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      showToast(e.message)
    }
  }
}
