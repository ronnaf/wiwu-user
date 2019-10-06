import { createAction } from 'redux-actions'
import { auth, firestore } from '../../firebase'
import { SCREEN_LOADING, UPLOAD_ID } from './user.constants'
import { uploadAsset } from '../../helpers/upload.helper'
import showToast from '../../helpers/toast.helper'
import NavigationService from '../../navigation/NavigationService'

export const uploadId = idImage => {
  return async dispatch => {
    try {
      dispatch(createAction(SCREEN_LOADING)(true))
      await uploadAsset('ids', 'image', idImage, async url => {
        const { uid } = auth.currentUser
        await firestore
          .collection('users')
          .doc(uid)
          .update({
            idImage: url
          })
        dispatch(createAction(UPLOAD_ID)())
        NavigationService.navigate('UserHome')
        dispatch(createAction(SCREEN_LOADING)(false))
        showToast('Id uploaded. Your account will be verified ASAP.')
      })
    } catch (error) {
      showToast(error.message)
    }
  }
}
