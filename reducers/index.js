import { combineReducers } from 'redux'

const reducers = {}

let combinedReducers
if (Object.getOwnPropertyNames(reducers).length > 0) {
  combinedReducers = combineReducers(reducers)
} else {
  combinedReducers = () => {}
}

export default combinedReducers
