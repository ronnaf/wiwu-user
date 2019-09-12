import uuid from 'uuid/v4'
import _ from 'lodash'
import { firebase, storage } from '../firebase'
import { convertUriToBlob } from './blob.helper'

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
    console.log('[!] uploadAsset 1 - starting...')
    const filename = uuid()
    const extension = _.split(uri, '.')[1]

    // // convert image uri to blob
    console.log('[!] uploadAsset 2 - getting avatar blob...')
    const avatarBlob = await convertUriToBlob(uri)
    console.log('[!] uploadAsset 3 - got avatar blob!')

    // upload avatar to cloud storage
    console.log('[!] uploadAsset 4 - uploading image...')
    const storageRef = storage.ref()
    const uploadAvatar = storageRef
      .child(`${storageFolder}/${filename}.${extension}`)
      .put(avatarBlob)

    console.log('[!] uploadAsset 5 - listening to upload...')
    uploadAvatar.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {},
      error => {
        console.log('[!] ERROR - uploadAvatar -', error)
        throw error
      },
      async () => {
        console.log('[!] uploadAsset 6 - upload successful! getting url...')
        const url = await uploadAvatar.snapshot.ref.getDownloadURL()
        console.log('[!] uploadAsset 7 - got url! ->', url)

        // execute callback
        console.log('[!] uploadAsset 8 - executing callback')
        callbackAfterUpload(url)
      }
    )
  } catch (e) {
    console.log('[!] ERR - uploadAsset -', e)
    throw e
  }
}
