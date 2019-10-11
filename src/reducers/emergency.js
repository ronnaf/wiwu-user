import {
  SET_SELECTED_DEPARTMENT,
  GET_ALL_EMERGENCIES,
  GET_OWN_EMERGENCIES
} from '../actions/emergency/emergency.constants'

const initialState = {
  departmentSelected: '',
  list: [], // this is for queried emergencies
  myEmergencies: []
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
    case GET_OWN_EMERGENCIES:
      return {
        ...state,
        myEmergencies: action.payload
      }
    default:
      return state
  }
}
