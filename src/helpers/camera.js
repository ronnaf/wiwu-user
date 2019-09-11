import { Permissions } from 'react-native-unimodules'
import { ActionSheet } from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import showToast from './toast.helper'

/**
 * asks for permission to use the cam
 * - camera
 * - camera roll
 *
 * @returns {Promise<boolean>}
 */
export const askCameraPermission = async () => {
  try {
    // TODO: make sure to support android
    const { status: cameraStatus } = await Permissions.askAsync(
      Permissions.CAMERA
    )
    const { status: cameraRollStatus } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    )

    if (cameraStatus !== 'granted' && cameraRollStatus !== 'granted') {
      showToast('You denied camera access!', 'error')
      return false
    } else {
      return true
    }
  } catch (e) {
    showToast(e.message, 'error')
    return false
  }
}

/**
 * launches camera or camera roll
 *
 * @param setFieldValue
 * @param fieldName first parameter for setFieldValue
 * @param type could be one of the following: `camera`, `roll`
 * @param mediaTypes see ImagePicker.MediaTypeOptions
 * @returns {Promise<void>}
 */
export const launchMediaAsync = async (
  setFieldValue,
  fieldName,
  type,
  mediaTypes
) => {
  try {
    const isPermitted = await askCameraPermission()
    const action =
      type === 'camera'
        ? ImagePicker.launchCameraAsync
        : ImagePicker.launchImageLibraryAsync

    if (isPermitted) {
      const response = await action({
        mediaTypes,
        allowsEditing: true,
        quality: 0.3
      })

      setFieldValue(fieldName, response.uri)
    }
  } catch (e) {
    showToast(e.message, 'error')
  }
}

/**
 * shows ActionSheet with camera options
 *
 * @example
 * ```
 * showCameraActionSheet(
 *    setFieldValue,
 *    'avatar',
 *    'Take Photo',
 *    'Select an Avatar',
 *    ImagePicker.MediaTypeOptions.Images
 * )
 * ```
 *
 * @param setFieldValue
 * @param fieldName
 * @param cameraButtonLabel
 * @param actionSheetTitle
 * @param mediaTypes
 * @returns {Promise<void>}
 */
export const showCameraActionSheet = async (
  setFieldValue,
  fieldName,
  cameraButtonLabel,
  actionSheetTitle,
  mediaTypes
) => {
  ActionSheet.show(
    {
      options: [cameraButtonLabel, 'Choose from Gallery', 'Cancel'],
      cancelButtonIndex: 2,
      title: actionSheetTitle
    },
    async buttonIndex => {
      if (buttonIndex === 0) {
        await launchMediaAsync(setFieldValue, fieldName, 'camera', mediaTypes)
      } else if (buttonIndex === 1) {
        await launchMediaAsync(setFieldValue, fieldName, 'roll', mediaTypes)
      }
    }
  )
}
