import {
  LOGIN,
  LOGOUT,
  SIGNUP,
  EDIT,
  VERIFY,
  NET_INFO,
  CHANGE_PASSWORD,
  SCREEN_LOADING,
  UPLOAD_ID,
  UPDATE_VERIFICATION_STATUS
} from '../actions/user/user.constants'

const initialState = {
  // master account
  current: {
    // added this so it wont conflict so that the userSettings map will have the users default home value
    homeCoordinates: {
      latitude: 10.7202,
      longitude: 122.5621
    }
  },
  netInfo: {
    type: 'none',
    effectiveType: 'unknown',
    isOffline: false
  },
  isLoading: false,
  isUserVerified: false
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
    case VERIFY:
      return {
        ...state,
        current: {
          ...state.current,
          isEmailVerified: action.payload
        }
      }
    case UPLOAD_ID:
      return {
        ...state
      }
    case LOGOUT:
      return {
        ...initialState,
        netInfo: state.netInfo
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
    case UPDATE_VERIFICATION_STATUS:
      return {
        ...state,
        current: {
          ...state.current,
          isUserVerified: action.payload
        }
      }
    default:
      return state
  }
}
