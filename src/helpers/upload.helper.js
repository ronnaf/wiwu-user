import uuid from 'uuid/v4'
import _ from 'lodash'
import RNFetchBlob from 'rn-fetch-blob'
import { firebase, storage } from '../firebase'

/**
 * uploads assets
 *
 * @param storageFolder
 * @param type
 * @param uri
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

    // convert image uri to blob
    const Blob = RNFetchBlob.polyfill.Blob
    const originalXMLHttpRequest = window.XMLHttpRequest
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob

    const avatarBlob = await Blob.build(
      RNFetchBlob.wrap(uri.replace('file://', '')),
      { type: `${type}/${extension}` }
    )

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
        avatarBlob.close()
        const url = await uploadAvatar.snapshot.ref.getDownloadURL()

        // to prevent blocking of firestore requests
        window.XMLHttpRequest = originalXMLHttpRequest

        callbackAfterUpload(url)
      }
    )
  } catch (e) {
    console.log('[!] ERR - uploadAsset -', e)
    throw e
  }
}
