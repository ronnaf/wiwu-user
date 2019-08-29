import {
  GET_CONTACTS,
  EDIT_CONTACT,
  DELETE_CONTACT
} from '../actions/contact/contact.constants'

const initialState = {
  list: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        list: action.payload
      }
    case EDIT_CONTACT:
      return {
        ...state,
        list: action.payload
      }
    case DELETE_CONTACT:
      return {
        ...state,
        list: action.payload
      }
    default:
      return state
  }
}
