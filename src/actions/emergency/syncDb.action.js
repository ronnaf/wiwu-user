import { firestore, firebase } from '../../firebase'

import { WIWU_OFFLINE_EMERGENCY_ARRAY } from '../emergency/emergency.constants'
import { SCREEN_LOADING } from '../user/user.constants'

import * as SecureStore from 'expo-secure-store'
import { createAction } from 'redux-actions'

export const syncDb = () => {
  return async dispatch => {
    try {
      dispatch(createAction(SCREEN_LOADING)(true))

      const emergencyArray = await SecureStore.getItemAsync(
        WIWU_OFFLINE_EMERGENCY_ARRAY
      )

      if (emergencyArray) {
        const arr = JSON.parse(emergencyArray)

        for (const item of arr) {
          // mutating so the userId will be a document reference
          item.userId = firestore.doc(`users/${item.userId}`)

          const emergency = await firestore.collection('emergencies').add(item)
          await firestore
            .collection('users')
            .doc(item.userId)
            .update({
              emergencies: firebase.firestore.FieldValue.arrayUnion(emergency)
            })

          await SecureStore.deleteItemAsync(WIWU_OFFLINE_EMERGENCY_ARRAY)
        }
      }

      dispatch(createAction(SCREEN_LOADING)(false))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
    }
  }
}
