import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NetInfo, StyleSheet } from 'react-native'
import { createAction } from 'redux-actions'
import Spinner from 'react-native-loading-spinner-overlay'
import { Root, View, Text } from 'native-base'

import { NET_INFO } from '../actions/user/user.constants'

// import MainTabNavigator from './MainTabNavigator'
import AuthNavigator from './sub-navigators/AuthNavigator'
import SignupNavigator from './sub-navigators/SignupNavigator'
import UserNavigator from './sub-navigators/UserNavigator'
import ResponderNavigator from './sub-navigators/ResponderNavigator'
import NavigationService from './NavigationService'

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
  const isOffline = useSelector(state => state.user.netInfo.type === 'none')
  const dispatch = useDispatch()

  // placed inside so I dont have to pass dispatch as parameter
  const handleConnectivityChange = connectionInfo => {
    dispatch(createAction(NET_INFO)(connectionInfo))
  }

  const getConnection = async () => {
    const connectionInfo = await NetInfo.getConnectionInfo()
    dispatch(createAction(NET_INFO)(connectionInfo))
    NetInfo.addEventListener('connectionChange', handleConnectivityChange)
  }

  useEffect(() => {
    getConnection(dispatch)
  }, [])

  return (
    <Fragment>
      <Spinner visible={isLoading} />
      <Root>
        {isOffline && (
          <View
            // TODO: add transition so it doesnt look awkward
            style={styles.offlineContainer}>
            <Text style={styles.offlineText}>No Internet Connection</Text>
          </View>
        )}
        <Navigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
      </Root>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    bottom: 0
  },
  offlineText: {
    color: '#fff'
  }
})

export default AppNavigator
