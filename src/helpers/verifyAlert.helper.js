import { Alert } from 'react-native'
import NavigationService from '../navigation/NavigationService'

export const verifyAlert = () => {
  Alert.alert(
    'Unverified Identity',
    'This feature is unavailable. Would you like to verify your identity now?',
    [
      {
        text: 'Ask me later',
        onPress: () => console.log('Ask me later pressed')
      },
      {
        text: 'OK',
        onPress: () => NavigationService.navigate('UserVerification')
      }
    ],
    {
      cancelable: false
    }
  )
}
