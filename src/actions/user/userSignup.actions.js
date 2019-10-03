import { createAction } from 'redux-actions'
import * as SecureStore from 'expo-secure-store'

import { auth, firestore } from '../../firebase'
import { SIGNUP, SCREEN_LOADING, WIWU_USER_INFO } from './user.constants'
import { statuses, roles } from '../../constants/User'
import { capitalize } from '../../helpers/capitalize.helper'
import NavigationService from '../../navigation/NavigationService'
import showToast from '../../helpers/toast.helper'
import { uploadAsset } from '../../helpers/upload.helper'

export function signup(values) {
  return async (dispatch, getState) => {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        avatar
      } = values
      const {
        map: {
          pinCoordinates: { latitude, longitude }
        }
      } = getState()

      if (!avatar) {
        throw new Error('Avatar is required!')
      }

      dispatch(createAction(SCREEN_LOADING)(true))

      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      )
      const { uid } = response.user

      await uploadAsset('avatars', 'image', avatar, async url => {
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
          status: statuses.ACTIVE,
          avatar: url
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
      })
    } catch (e) {
      dispatch(createAction(SCREEN_LOADING)(false))
      console.log('[!] error - userSignup -', e)
      showToast(e.message)
    }
  }
}
