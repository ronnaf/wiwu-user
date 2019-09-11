import { createAction } from 'redux-actions'

import { capitalize } from '../../helpers/capitalize.helper'
import { auth, firestore, storage, firebase } from '../../firebase'
import { SCREEN_LOADING, EDIT } from './user.constants'
import NavigationService from '../../navigation/NavigationService'
import showToast from '../../helpers/toast.helper'
import RNFetchBlob from 'rn-fetch-blob'
import uuid from 'uuid/v4'
import _ from 'lodash'

export function editUser(user) {
  return async dispatch => {
    try {
      dispatch(createAction(SCREEN_LOADING)(true))

      const { avatar: uri } = user
      const filename = uuid()
      const extension = _.split(uri, '.')[1]

      // convert image uri to blob
      const Blob = RNFetchBlob.polyfill.Blob
      const originalXMLHttpRequest = window.XMLHttpRequest
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
      window.Blob = Blob

      const avatarBlob = await Blob.build(
        RNFetchBlob.wrap(uri.replace('file://', '')),
        { type: `image/${extension}` }
      )

      // upload avatar to cloud storage
      const storageRef = storage.ref()
      const uploadAvatar = storageRef
        .child(`avatars/${filename}.${extension}`)
        .put(avatarBlob)

      uploadAvatar.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {},
        error => {
          console.log('[!] ERROR - uploadAvatar -', error)
          throw error
        },
        async () => {
          avatarBlob.close()
          const url = await uploadAvatar.snapshot.ref.getDownloadURL()
          window.XMLHttpRequest = originalXMLHttpRequest

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
        }
      )
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      showToast(e.message)
      console.log('[!] ERROR -', e)
    }
  }
}
