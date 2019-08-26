import { SEND_EMERGENCY } from './emergency.constants'
import { SCREEN_LOADING } from '../user/user.constants'

import { firestore, firebase } from '../../firebase'

import showToast from '../../helpers/toast.helper'

import { PermissionsAndroid, NativeModules } from 'react-native'
import { createAction } from 'redux-actions'
import * as SecureStore from 'expo-secure-store'

export function sendRequest(data) {
  return async (dispatch, getState) => {
    try {
      const {
        user: {
          netInfo: isOffline,
          current: { uid, firstName, lastName, email }
        },
        map: { pinCoordinates }
      } = getState()

      dispatch(createAction(SCREEN_LOADING)(true))

      const payload = {
        ...data,
        userId: uid,
        location: pinCoordinates,
        responderId: null,
        adminId: null,
        priority: 'UNDETERMINED',
        status: 'PENDING',
        date: new Date()
      }

      // TODO: ADD CAMERA
      if (isOffline) {
        try {
          // works only for android
          const DirectSms = NativeModules.DirectSms
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.SEND_SMS,
            {
              title: 'Wiwu App Sms Permission',
              message:
                'Wiwu App needs access to your inbox ' +
                'so you can send messages in background.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK'
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            DirectSms.sendDirectSms('09177456123', JSON.stringify(payload))
            showToast('Message has been sent', 'success')
            // TODO: save to localstorage to sync later when online
          } else {
            console.log('SMS permission denied')
          }
        } catch (err) {
          console.warn(err)
        }
      } else {
        const emergency = await firestore.collection('emergencies').add(payload)
        await firestore
          .collection('users')
          .doc(uid)
          .update({
            emergencies: firebase.firestore.FieldValue.arrayUnion(emergency)
          })
      }

      dispatch(createAction(SCREEN_LOADING)(false))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      console.log(e)
    }
  }
}
