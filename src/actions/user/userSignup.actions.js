import { createAction } from 'redux-actions'
import * as SecureStore from 'expo-secure-store'

import { auth, firestore } from '../../firebase'
import { SIGNUP, SCREEN_LOADING, WIWU_USER_INFO } from './user.constants'
import { statuses, roles } from '../../constants/User'
import { capitalize } from '../../helpers/capitalize.helper'
import NavigationService from '../../navigation/NavigationService'
import showToast from '../../helpers/toast.helper'
import { uploadAsset } from '../../helpers/upload.helper'

export function signup(user) {
  return async (dispatch, getState) => {
    try {
      console.log('[!] 1 signup - start')
      const { email, password, firstName, lastName, phoneNumber, avatar } = user
      const {
        map: {
          pinCoordinates: { latitude, longitude }
        }
      } = getState()

      if (!avatar) {
        throw new Error('Avatar is required!')
      }

      dispatch(createAction(SCREEN_LOADING)(true))

      console.log('[!] 2 signup - creating user...')
      await auth.createUserWithEmailAndPassword(email, password)
      const uid = auth.currentUser.uid

      console.log('[!] 3 signup - uploading asset...')
      await uploadAsset('avatars', 'image', avatar, async url => {
        console.log('[!] 4 signup - callback start...')
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

        console.log('[!] 5 signup - store user document...')
        await firestore
          .collection('users')
          .doc(uid)
          .set(data)

        console.log('[!] 6 signup - sending email verification...')
        await auth.currentUser.sendEmailVerification()

        console.log('[!] 7 signup - setting item async...')
        const payload = { email: auth.currentUser.email, uid }
        await SecureStore.setItemAsync(WIWU_USER_INFO, JSON.stringify(payload))

        console.log('[!] 8 signup - dispatching after...')
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
