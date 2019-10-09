import { PermissionsAndroid, Platform } from 'react-native'
import * as Permissions from 'expo-permissions'

import showToast from './toast.helper'

export const requestCamera = async () => {
  const grantedCamera =
    Platform.OS === 'ios'
      ? await Permissions.askAsync(Permissions.CAMERA)
      : await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Wiwu App Camera Permission',
            message:
              'Wiwu needs access to your camera so you can join the video',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
          }
        )
  if (
    Platform.OS === 'ios'
      ? grantedCamera.status === 'granted'
      : grantedCamera === PermissionsAndroid.RESULTS.GRANTED
  ) {
    return true
  } else {
    showToast('Camera permission denied')
    return false
  }
}

export const requestMicrophone = async () => {
  const grantedAudio =
    Platform.OS === 'ios'
      ? await Permissions.askAsync(Permissions.AUDIO_RECORDING)
      : await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Wiwu App Microphone Permission',
            message:
              'Wiwu App needs access to your microphone ' +
              'to speak with the verification admin',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
          }
        )
  if (
    Platform.OS === 'ios'
      ? grantedAudio.status === 'granted'
      : grantedAudio === PermissionsAndroid.RESULTS.GRANTED
  ) {
    return true
  } else {
    showToast('Microphone permission denied')
    return false
  }
}
