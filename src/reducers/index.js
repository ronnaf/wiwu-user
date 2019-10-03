import { combineReducers } from 'redux'
import user from './user'
import contacts from './contacts'
import map from './map'
import emergency from './emergency'
import twilio from './twilio'

export default combineReducers({
  user,
  contacts,
  map,
  emergency,
  twilio
})
