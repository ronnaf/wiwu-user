import {
  SET_SELECTED_DEPARTMENT,
  GET_ALL_EMERGENCIES
} from '../actions/emergency/emergency.constants'

const initialState = {
  departmentSelected: '',
  list: [] // this is for queried emergencies
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_DEPARTMENT:
      return {
        ...state,
        departmentSelected: action.payload
      }
    case GET_ALL_EMERGENCIES:
      return {
        ...state,
        list: action.payload
      }
    default:
      return state
  }
}
