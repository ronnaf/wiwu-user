import {
  LOGIN,
  LOGOUT,
  SIGNUP,
  EDIT,
  CHANGE_PASSWORD,
  SCREEN_LOADING
} from '../actions/user/user.constants.js'

const initialState = {
  // master account
  current: {},
  isLoading: false
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
    case EDIT:
      return {
        ...state,
        current: {
          ...state.current,
          ...action.payload
        }
      }
    case LOGOUT:
      return {
        ...initialState
      }
    case CHANGE_PASSWORD:
      return {
        ...initialState
      }
    case SCREEN_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return state
  }
}
