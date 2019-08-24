import { GET_CONTACTS } from './contact.constants'
import { SCREEN_LOADING } from '../user/user.constants'
import { firestore } from '../../firebase'
import { createAction } from 'redux-actions'

export function getContacts() {
  return async dispatch => {
    try {
      dispatch(createAction(SCREEN_LOADING)(true))

      const contacts = await firestore.collection('contacts').get()
      const data = contacts.docs.map(e => e.data())

      dispatch(createAction(GET_CONTACTS)(data))
      dispatch(createAction(SCREEN_LOADING)(false))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      console.log(e)
    }
  }
}
