import { WIWU_OFFLINE_EMERGENCY_ARRAY } from './emergency.constants'
import { SCREEN_LOADING } from '../user/user.constants'

import { firestore, firebase } from '../../firebase'

import showToast from '../../helpers/toast.helper'

import { PermissionsAndroid, NativeModules } from 'react-native'
import { SECRET_KEY } from 'react-native-dotenv'
import { createAction } from 'redux-actions'
import * as SecureStore from 'expo-secure-store'
import SimpleCrypto from 'simple-crypto-js'

export function sendRequest(data) {
  return async (dispatch, getState) => {
    try {
      const {
        user: {
          netInfo: isOffline,
          current: { uid }
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
            const simpleCrypto = new SimpleCrypto(SECRET_KEY)
            DirectSms.sendDirectSms(
              '09177456123',
              simpleCrypto.encrypt(JSON.stringify(payload))
            )
            showToast('Message has been sent', 'success')

            const emergencyArray = await SecureStore.getItemAsync(
              WIWU_OFFLINE_EMERGENCY_ARRAY
            )

            if (emergencyArray) {
              const arr = JSON.parse(emergencyArray)
              arr.push(payload)
              await SecureStore.setItemAsync(
                WIWU_OFFLINE_EMERGENCY_ARRAY,
                JSON.stringify(arr)
              )
            } else {
              await SecureStore.setItemAsync(
                WIWU_OFFLINE_EMERGENCY_ARRAY,
                JSON.stringify([payload])
              )
            }
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
