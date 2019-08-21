import {
  LOGIN,
  LOGOUT,
  SIGNUP,
  EDIT,
  NET_INFO,
  CHANGE_PASSWORD,
  SCREEN_LOADING
} from '../actions/user/user.constants'

const initialState = {
  // master account
  current: {},
  netInfo: {
    type: 'none',
    effectiveType: 'unknown'
  },
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
    case NET_INFO:
      return {
        ...state,
        netInfo: action.payload
      }
    default:
      return state
  }
}
