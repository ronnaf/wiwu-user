import { createAction } from 'redux-actions'
import * as SecureStore from 'expo-secure-store'

import { auth, firestore } from '../../firebase'
import { LOGIN, SCREEN_LOADING, WIWU_USER_INFO } from './user.constants'
import NavigationService from '../../navigation/NavigationService'
import showToast from '../../helpers/toast.helper'

// To refresh token every login
export function checkUser() {
  return async (dispatch, getState) => {
    try {
      const {
        user: {
          netInfo: { isOffline },
          current: { isEmailVerified }
        }
      } = getState()

      dispatch(createAction(SCREEN_LOADING)(true))

      if (isOffline && isEmailVerified) {
        // if isEmailVerified field is present, its safe to assume the SecureStore wont be null
        const payloadJSON = await SecureStore.getItemAsync(WIWU_USER_INFO)
        const payload = JSON.parse(payloadJSON)

        if (payload.status !== 'active') {
          await SecureStore.deleteItemAsync(WIWU_USER_INFO)
          throw new Error('User is not available. Please contact support!')
        }

        dispatch(createAction(LOGIN)(payload))
        NavigationService.navigate('UserHome')
      } else if (!isOffline) {
        // Auto unsubscribes if no net so no need to worry
        auth.onAuthStateChanged(async user => {
          // function inside this listener will not be caught by outer try catch
          try {
            if (user) {
              dispatch(createAction(SCREEN_LOADING)(true))

              await user.getIdToken(true)
              const userDocument = await firestore
                .collection('users')
                .doc(user.uid)
                .get()
              const userData = userDocument.data()

              if (userData.status !== 'active') {
                await auth.signOut()
                await SecureStore.deleteItemAsync(WIWU_USER_INFO)
                throw new Error(
                  'User is not available. Please contact support!'
                )
              }

              const payload = {
                ...userData,
                emergencies: userData.emergencies.map(e => e.id),
                email: user.email,
                uid: user.uid,
                isEmailVerified: user.emailVerified
              }

              await SecureStore.setItemAsync(
                WIWU_USER_INFO,
                JSON.stringify(payload)
              )

              dispatch(createAction(LOGIN)(payload))

              const nav = user.emailVerified ? 'UserHome' : 'Unverified'
              NavigationService.navigate(nav)
              dispatch(createAction(SCREEN_LOADING)(false))
            }
          } catch (e) {
            dispatch(createAction(SCREEN_LOADING)(false))
            showToast(e.message)
          }
        })
      }

      dispatch(createAction(SCREEN_LOADING)(false))
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      showToast(e.message)
    }
  }
}
