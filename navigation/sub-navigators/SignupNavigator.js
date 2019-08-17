import { createStackNavigator } from 'react-navigation'

import SignupScreen from '../../screens/shared/SignupScreen'

const SignupNavigator = createStackNavigator(
  {
    Signup: {
      screen: SignupScreen
    }
  },
  {
    headerMode: 'none'
  }
)

export default SignupNavigator
