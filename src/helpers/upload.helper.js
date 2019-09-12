import uuid from 'uuid/v4'
import _ from 'lodash'
import { firebase, storage } from '../firebase'
import { uriToBlob } from './blob.helper'

/**
 * uploads assets
 * @param storageFolder
 * @param type
 * @param uri
 * @param callbackAfterUpload
 * @returns {Promise<void>}
 */
export const uploadAsset = async (
  storageFolder,
  type,
  uri,
  callbackAfterUpload
) => {
  try {
    const filename = uuid()
    const extension = _.split(uri, '.')[1]

    // // convert image uri to blob
    const avatarBlob = await uriToBlob(uri)

    // upload avatar to cloud storage
    const storageRef = storage.ref()
    const uploadAvatar = storageRef
      .child(`${storageFolder}/${filename}.${extension}`)
      .put(avatarBlob)

    uploadAvatar.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {},
      error => {
        console.log('[!] ERROR - uploadAvatar -', error)
        throw error
      },
      async () => {
        const url = await uploadAvatar.snapshot.ref.getDownloadURL()

        // execute callback
        callbackAfterUpload(url)
      }
    )
  } catch (e) {
    console.log('[!] ERR - uploadAsset -', e)
    throw e
  }
}
