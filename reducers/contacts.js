import {
  GET_CONTACTS,
  EDIT_CONTACT,
  DELETE_CONTACT
} from '../actions/contactDirectory/contactDirectory.constants'

const initialState = {
  contacts: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload
      }
    case EDIT_CONTACT:
      return {
        ...state,
        contacts: action.payload
      }
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: action.payload
      }
    default:
      return state
  }
}
