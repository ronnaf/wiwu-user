import { SCREEN_LOADING } from '../user/user.constants'
import { firestore, firebase } from '../../firebase'
import showToast from '../../helpers/toast.helper'
import NavigationService from '../../navigation/NavigationService'
import { PermissionsAndroid, NativeModules, Platform } from 'react-native'
import { SECRET_KEY } from 'react-native-dotenv'
import { createAction } from 'redux-actions'
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
      const smsReceiver = '09177456123'

      dispatch(createAction(SCREEN_LOADING)(true))

      const payload = {
        ...values,
        userId: isOffline ? uid : firestore.doc(`users/${uid}`),
        location: pinCoordinates,
        responderId: null,
        adminId: null,
        priority: 'UNDETERMINED',
        status: 'PENDING',
        date: new Date(),
        media: null
      }

      if (isOffline) {
        if (Platform.OS === 'android') {
          // works only for android
          const DirectSms = NativeModules.DirectSms
          const permissionMessage = {
            title: 'wiwu SMS Permission',
            message:
              'wiwu needs access to your inbox so you can send messages in the background',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
          }

          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.SEND_SMS,
            permissionMessage
          )

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const secretPayload = simpleCrypto.encrypt(JSON.stringify(payload))
            DirectSms.sendDirectSms(smsReceiver, secretPayload)
            showToast('Message has been sent', 'success')
          } else {
            throw new Error('Cannot send SMS')
          }
        } else {
          // if device is not android; TODO: test on real device
          const isAvailable = await SMS.isAvailableAsync()
          if (!isAvailable) {
            throw new Error('Cannot send SMS')
          }

          const encryptedPayload = simpleCrypto.encrypt(JSON.stringify(payload))
          await SMS.sendSMSAsync(smsReceiver, encryptedPayload)
          showToast('Message has been sent', 'success')
        }
      } else {
        // if user is online

        // TODO: refactor -R
        if (values.media) {
          // if user included a media
          await uploadAsset(
            'emergency-assets',
            'image',
            values.media,
            async url => {
              const payloadWithMedia = { ...payload, media: url }
              const emergency = await firestore
                .collection('emergencies')
                .add(payloadWithMedia)
              await firestore
                .collection('users')
                .doc(uid)
                .update({
                  emergencies: firebase.firestore.FieldValue.arrayUnion(
                    emergency
                  )
                })
            }
          )
        } else {
          // if user did not include media
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
      }
      showToast('Emergency request sent!', 'success')
      NavigationService.navigate('UserHome')
      dispatch(createAction(SCREEN_LOADING)(false))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      showToast(e.message, 'error')
      console.log('[!] sendRequest - ERROR -', e)
    }
  }
}
