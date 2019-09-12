import { createAction } from 'redux-actions'

import { capitalize } from '../../helpers/capitalize.helper'
import { auth, firestore, storage, firebase } from '../../firebase'
import { SCREEN_LOADING, EDIT } from './user.constants'
import NavigationService from '../../navigation/NavigationService'
import showToast from '../../helpers/toast.helper'
import { uploadAsset } from '../../helpers/upload.helper'

export function editUser(user) {
  return async dispatch => {
    try {
      dispatch(createAction(SCREEN_LOADING)(true))

      await uploadAsset('avatars', 'image', user.avatar, async url => {
        // dont send email field
        const data = {
          firstName: capitalize(user.firstName),
          lastName: capitalize(user.lastName),
          phoneNumber: user.phoneNumber,
          avatar: url
        }

        // update user document
        const { uid } = auth.currentUser
        await firestore
          .collection('users')
          .doc(uid)
          .update(data)

        dispatch(createAction(EDIT)(data))
        NavigationService.navigate('UserHome')
        dispatch(createAction(SCREEN_LOADING)(false))
      })
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      showToast(e.message)
      console.log('[!] ERROR -', e)
    }
  }
}
