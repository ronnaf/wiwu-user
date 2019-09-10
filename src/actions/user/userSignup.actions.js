import { createAction } from 'redux-actions'
import * as SecureStore from 'expo-secure-store'

import { auth, firestore } from '../../firebase'
import { SIGNUP, SCREEN_LOADING, WIWU_USER_INFO } from './user.constants'
import { statuses, roles } from '../../constants/User'
import { capitalize } from '../../helpers/capitalize.helper'
import NavigationService from '../../navigation/NavigationService'
import showToast from '../../helpers/toast.helper'

export function signup(user) {
  return async (dispatch, getState) => {
    try {
      const { email, password, firstName, lastName, phoneNumber } = user
      const {
        map: {
          pinCoordinates: { latitude, longitude }
        }
      } = getState()

      dispatch(createAction(SCREEN_LOADING)(true))

      await auth.createUserWithEmailAndPassword(email, password)
      const uid = auth.currentUser.uid

      const data = {
        firstName: capitalize(firstName),
        lastName: capitalize(lastName),
        phoneNumber,
        homeCoordinates: {
          latitude,
          longitude
        },
        emergencies: [],
        role: roles.USER,
        isUserVerified: false, // this is for video verification not email verification
        status: statuses.ACTIVE
      }

      await firestore
        .collection('users')
        .doc(uid)
        .set(data)
      await auth.currentUser.sendEmailVerification()

      const payload = { email: auth.currentUser.email, uid }

      await SecureStore.setItemAsync(WIWU_USER_INFO, JSON.stringify(payload))

      dispatch(createAction(SIGNUP)({ email: auth.currentUser.email, uid }))
      NavigationService.navigate('Unverified')
      dispatch(createAction(SCREEN_LOADING)(false))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      showToast(e.message)
    }
  }
}
