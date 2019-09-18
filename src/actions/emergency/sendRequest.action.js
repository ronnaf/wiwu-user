import { WIWU_OFFLINE_EMERGENCY_ARRAY } from './emergency.constants'
import { SCREEN_LOADING } from '../user/user.constants'

import { firestore, firebase } from '../../firebase'

import showToast from '../../helpers/toast.helper'

import NavigationService from '../../navigation/NavigationService'

import { PermissionsAndroid, NativeModules, Platform } from 'react-native'
import { SECRET_KEY } from 'react-native-dotenv'
import { createAction } from 'redux-actions'
import * as SecureStore from 'expo-secure-store'
import SimpleCrypto from 'simple-crypto-js'
import * as SMS from 'expo-sms'
import { uploadAsset } from '../../helpers/upload.helper'

export function sendRequestAction(values) {
  return async (dispatch, getState) => {
    try {
      const {
        user: {
          netInfo: { isOffline },
          current: { uid }
        },
        map: { pinCoordinates }
      } = getState()
      const simpleCrypto = new SimpleCrypto(SECRET_KEY)

      dispatch(createAction(SCREEN_LOADING)(true))
      await uploadAsset(
        'emergency-assets',
        'image',
        values.media,
        async url => {
          const payload = {
            ...values,
            userId: isOffline ? uid : firestore.doc(`users/${uid}`),
            location: pinCoordinates,
            responderId: null,
            adminId: null,
            priority: 'UNDETERMINED',
            status: 'PENDING',
            date: new Date(),
            media: url
          }

          if (isOffline) {
            if (Platform.OS === 'android') {
              // works only for android
              const DirectSms = NativeModules.DirectSms
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.SEND_SMS,
                {
                  title: 'wiwu SMS Permission',
                  message:
                    'wiwu needs access to your inbox ' +
                    'so you can send messages in the background',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK'
                }
              )

              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                DirectSms.sendDirectSms(
                  '09177456123',
                  simpleCrypto.encrypt(JSON.stringify(payload))
                )

                showToast('Message has been sent', 'success')
              } else {
                throw new Error('Cannot send SMS')
              }
            } else {
              // TODO: test on real device
              const isAvailable = await SMS.isAvailableAsync()
              if (!isAvailable) {
                throw new Error('Cannot send SMS')
              }

              await SMS.sendSMSAsync(
                '09177456123',
                simpleCrypto.encrypt(JSON.stringify(payload))
              )
              showToast('Message has been sent', 'success')
            }

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
            const emergency = await firestore
              .collection('emergencies')
              .add(payload)

            await firestore
              .collection('users')
              .doc(uid)
              .update({
                emergencies: firebase.firestore.FieldValue.arrayUnion(emergency)
              })
          }

          NavigationService.navigate('UserHome')
          dispatch(createAction(SCREEN_LOADING)(false))
        }
      )
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      showToast(e.message, 'error')
      console.log('[!] sendRequest - ERROR -', e)
    }
  }
}
