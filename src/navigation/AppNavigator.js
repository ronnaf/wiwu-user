import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NetInfo } from 'react-native'
import { createAction } from 'redux-actions'

import { NET_INFO } from '../actions/user/user.constants'

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
  const dispatch = useDispatch()

  // placed inside so I dont have to pass dispatch as parameter
  const handleFirstConnectivityChange = connectionInfo => {
    dispatch(createAction(NET_INFO)(connectionInfo))
    NetInfo.removeEventListener(
      'connectionChange',
      handleFirstConnectivityChange
    )
  }

  const getConnection = async () => {
    const connectionInfo = await NetInfo.getConnectionInfo()
    dispatch(createAction(NET_INFO)(connectionInfo))
    NetInfo.addEventListener('connectionChange', handleFirstConnectivityChange)
  }

  useEffect(() => {
    getConnection(dispatch)
  }, [])

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
