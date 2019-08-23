import {
  RESET_COORDINATES,
  EDIT_COORDINATES
} from '../actions/map/map.constants'

const initialState = {
  coordinates: {
    latitude: 10.7202,
    longitude: 122.5621,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RESET_COORDINATES:
      return {
        ...initialState
      }
    case EDIT_COORDINATES:
      return {
        ...state,
        coordinates: {
          ...state.coordinates,
          ...action.payload
        }
      }
    default:
      return state
  }
}
