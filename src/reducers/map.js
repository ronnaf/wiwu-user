import {
  RESET_COORDINATES,
  EDIT_PIN_COORDINATES,
  EDIT_REGION_COORDINATES
} from '../actions/map/map.constants'

const initialState = {
  regionCoordinates: {
    latitude: 10.7202,
    longitude: 122.5621,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  },
  pinCoordinates: {
    latitude: 10.7202,
    longitude: 122.5621
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RESET_COORDINATES:
      return {
        ...initialState
      }
    case EDIT_PIN_COORDINATES:
      return {
        ...state,
        pinCoordinates: {
          ...state.pinCoordinates,
          ...action.payload
        }
      }
    case EDIT_REGION_COORDINATES:
      return {
        ...state,
        regionCoordinates: {
          ...state.regionCoordinates,
          ...action.payload
        }
      }
    default:
      return state
  }
}
