import { GET_CONTACTS } from './contact.constants'
import { SCREEN_LOADING } from '../user/user.constants'
import { firestore } from '../../../firebase'
import { createAction } from 'react-redux'
import { contacts } from '../../constants/dummy-contacts.const'

export function getContacts() {
  return async dispatch => {
    try {
      dispatch(createAction(SCREEN_LOADING)(true))

      // TODO: add later
      // const contacts = firestore.collection('contactDirectories').get()

      dispatch(createAction(GET_CONTACTS)(contacts))
      dispatch(createAction(SCREEN_LOADING)(true))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      console.log(e)
    }
  }
}
