import { createStackNavigator } from 'react-navigation'

import LoginScreen from '../../screens/shared/LoginScreen'
import UnverifiedScreen from '../../screens/shared/UnverifiedScreen'
import Contact from '../../screens/user/Contact'

const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Unverified: {
      screen: UnverifiedScreen
    },
    Contact: {
      screen: Contact
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Contact'
  }
)

export default AuthNavigator
