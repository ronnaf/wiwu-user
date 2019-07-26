import { createAppContainer, createSwitchNavigator } from 'react-navigation'

// import MainTabNavigator from './MainTabNavigator'
import AuthNavigator from './sub-navigators/AuthNavigator'
import SignupNavigator from './sub-navigators/SignupNavigator'
import UserNavigator from './sub-navigators/UserNavigator'
import ResponderNavigator from './sub-navigators/ResponderNavigator'

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      // Main: MainTabNavigator
      Auth: {
        screen: AuthNavigator
      },
      Signup: {
        screen: SignupNavigator
      },
      User: {
        screen: UserNavigator
      },
      Responder: {
        screen: ResponderNavigator
      }
    },
    {
      initialRouteName: 'User'
    }
  )
)
