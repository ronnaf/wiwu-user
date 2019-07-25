import { LOGIN, LOGOUT, SIGNUP } from '../actions/user/user.constants.js'

const initialState = {
  // master account
  current: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        current: action.payload
      }
    case SIGNUP:
      return {
        ...state,
        current: action.payload
      }
    case LOGOUT:
      return {
        ...initialState
      }
    default:
      return state
  }
}
