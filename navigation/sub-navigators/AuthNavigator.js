import { createStackNavigator } from 'react-navigation'
import LoginScreen from '../../screens/shared/LoginScreen'

const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen
    }
  },
  {
    headerMode: 'none'
  }
)

export default AuthNavigator
