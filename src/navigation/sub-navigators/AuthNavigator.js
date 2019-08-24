import { createStackNavigator } from 'react-navigation'

import LoginScreen from '../../screens/shared/LoginScreen'
import UnverifiedScreen from '../../screens/shared/UnverifiedScreen'

const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Unverified: {
      screen: UnverifiedScreen
    }
  },
  {
    headerMode: 'none'
    // initialRouteName: 'Unverified'
  }
)

export default AuthNavigator
