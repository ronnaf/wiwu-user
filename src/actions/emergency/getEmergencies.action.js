import { firestore } from '../../firebase'
import { SCREEN_LOADING } from '../user/user.constants'
import { GET_ALL_EMERGENCIES } from './emergency.constants'
import showToast from '../../helpers/toast.helper'

import { createAction } from 'redux-actions'

/**
 * not used due to added firebase listener in UserMaps
 * @returns {Function}
 */
export function getEmergencies() {
  return async dispatch => {
    try {
      dispatch(createAction(SCREEN_LOADING)(true))

      const emergencyRef = await firestore
        .collection('emergencies')
        .where('status', '==', 'PENDING')
        .get()

      const emergencies = emergencyRef.docs.map(emergencyDoc => {
        const emergency = emergencyDoc.data()
        return {
          id: emergencyDoc.id,
          address: emergency.address,
          date: emergency.date.toDate(),
          department: emergency.department,
          description: emergency.description,
          location: emergency.location,
          media: emergency.media,
          priority: emergency.priority,
          role: emergency.role,
          status: emergency.status
        }
      })

      dispatch(createAction(GET_ALL_EMERGENCIES)(emergencies))
      dispatch(createAction(SCREEN_LOADING)(false))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      showToast(e.message)
    }
  }
}
