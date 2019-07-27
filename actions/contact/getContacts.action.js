import { GET_CONTACTS } from './contact.constants'
import { firestore } from '../../firebase'

export function getContacts() {
  return async dispatch => {
    try {
      const contacts = firestore.collection('contactDirectories').get()
      dispatch({
        type: GET_CONTACTS,
        payload: { contacts }
      })
    } catch (e) {
      console.log(e)
    }
  }
}
