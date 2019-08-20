import { auth } from '../../firebase'
import NavigationService from '../../navigation/NavigationService'
import ShowToast from '../helpers/toast.helper'

export const verifyUser = async () => {
  if (auth.currentUser) {
    // To refresh token every login
    await auth.currentUser.getIdToken(true)
    await auth.currentUser.reload()
    const user = auth.currentUser

    if (user.emailVerified) {
      NavigationService.navigate('UserHome')
    } else {
      ShowToast('User is not verified')
    }
    NavigationService.navigate(user.emailVerified ? 'UserHome' : 'Unverified')
  }
}
