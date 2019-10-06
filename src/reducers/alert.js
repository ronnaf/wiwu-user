import { GET_ALERTS } from '../actions/alert/alert.constants'

const initialState = {
  list: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALERTS:
      return {
        ...state,
        list: action.payload
      }
    default:
      return state
  }
}
