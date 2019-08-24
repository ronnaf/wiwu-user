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
      const { type, effectiveType } = action.payload
      const isOnline =
        type === 'wifi' ||
        (type === 'cellular' &&
          (effectiveType === '3g' ||
            effectiveType === '4g' ||
            effectiveType === '5g'))
      const payload = { ...action.payload, isOffline: !isOnline }

      return {
        ...state,
        netInfo: payload
      }
    default:
      return state
  }
}
