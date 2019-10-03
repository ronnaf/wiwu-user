import {
  GET_TOKEN,
  RESET_TOKEN,
  JOINED_VIDEO
} from '../actions/twilio/twilio.constants'

const initialState = {
  token: '',
  joinedRoom: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    case RESET_TOKEN:
      return initialState
    case JOINED_VIDEO:
      return {
        ...state,
        joinedRoom: action.payload
      }
    default:
      return state
  }
}
