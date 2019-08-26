import { combineReducers } from 'redux'
import user from './user'
import contacts from './contacts'
import map from './map'
import emergency from './emergency'

export default combineReducers({
  user: user,
  contacts: contacts,
  map: map,
  emergency: emergency
})
