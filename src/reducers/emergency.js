import { SET_SELECTED_DEPARTMENT } from '../actions/emergency/emergency.constants'

const initialState = {
  departmentSelected: ''
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_DEPARTMENT:
      return {
        ...state,
        departmentSelected: action.payload
      }
    default:
      return state
  }
}
