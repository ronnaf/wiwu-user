import { combineReducers } from 'redux'
import user from './user'
import contacts from './contacts'
import map from './map'

export default combineReducers({
  user: user,
  contacts: contacts,
  map: map
})
