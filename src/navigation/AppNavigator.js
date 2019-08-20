import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

// import MainTabNavigator from './MainTabNavigator'
import AuthNavigator from './sub-navigators/AuthNavigator'
import SignupNavigator from './sub-navigators/SignupNavigator'
import UserNavigator from './sub-navigators/UserNavigator'
import ResponderNavigator from './sub-navigators/ResponderNavigator'
import NavigationService from './NavigationService'

import Spinner from 'react-native-loading-spinner-overlay'
import { Root } from 'native-base'

const Navigator = createAppContainer(
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
      initialRouteName: 'Auth'
    }
  )
)

const AppNavigator = () => {
  const isLoading = useSelector(state => state.user.isLoading)

  return (
    <Fragment>
      <Spinner visible={isLoading} />
      <Root>
        <Navigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
      </Root>
    </Fragment>
  )
}

export default AppNavigator
