import { GET_CONTACTS, OFFLINE_CONTACTS } from './contact.constants'
import { SCREEN_LOADING } from '../user/user.constants'
import { firestore } from '../../firebase'

import { createAction } from 'redux-actions'
import * as SecureStore from 'expo-secure-store'

export function getContacts() {
  return async (dispatch, getState) => {
    try {
      let data
      const {
        user: {
          netInfo: { isOffline }
        }
      } = getState()

      dispatch(createAction(SCREEN_LOADING)(true))

      if (isOffline) {
        const contacts = await SecureStore.getItemAsync(OFFLINE_CONTACTS)
        data = JSON.parse(contacts) || []
      } else {
        const contacts = await firestore.collection('contacts').get()
        data = contacts.docs.map(e => {
          return {
            ...e.data(),
            id: e.id
          }
        })

        await SecureStore.setItemAsync(OFFLINE_CONTACTS, JSON.stringify(data))
      }

      dispatch(createAction(GET_CONTACTS)(data))
      dispatch(createAction(SCREEN_LOADING)(false))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      console.log(e)
    }
  }
}
