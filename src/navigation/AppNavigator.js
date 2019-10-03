import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NetInfo, StyleSheet } from 'react-native'
import { createAction } from 'redux-actions'
import Spinner from 'react-native-loading-spinner-overlay'
import { Root, View, Text } from 'native-base'
import OneSignal from 'react-native-onesignal'

import { NET_INFO } from '../actions/user/user.constants'

import { checkOnlineStatus } from '../helpers/online-status.helper'

// import MainTabNavigator from './MainTabNavigator'
import AuthNavigator from './sub-navigators/AuthNavigator'
import SignupNavigator from './sub-navigators/SignupNavigator'
import UserNavigator from './sub-navigators/UserNavigator'
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
      }
    },
    {
      initialRouteName: 'Auth'
    }
  )
)

const AppNavigator = () => {
  const isLoading = useSelector(state => state.user.isLoading)
  const isOffline = useSelector(state => state.user.netInfo.isOffline)
  const dispatch = useDispatch()

  // placed inside so I dont have to pass dispatch as parameter
  const handleConnectivityChange = connectionInfo => {
    const isOnline = checkOnlineStatus(connectionInfo)

    dispatch(
      createAction(NET_INFO)({
        ...connectionInfo,
        isOffline: !isOnline
      })
    )
  }

  const getConnection = async () => {
    const connectionInfo = await NetInfo.getConnectionInfo()
    const isOnline = checkOnlineStatus(connectionInfo)

    dispatch(
      createAction(NET_INFO)({
        ...connectionInfo,
        isOffline: !isOnline
      })
    )
    NetInfo.addEventListener('connectionChange', handleConnectivityChange)
    return function cleanup() {
      NetInfo.removeEventListener('connectionChange', handleConnectivityChange)
    }
  }

  const onReceived = notification => {
    console.log('Notification received: ', notification)
  }

  const onOpened = openResult => {
    console.log('Message: ', openResult.notification.payload.body)
    console.log('Data: ', openResult.notification.payload.additionalData)
    console.log('isActive: ', openResult.notification.isAppInFocus)
    console.log('openResult: ', openResult)
  }

  const onIds = device => {
    console.log('Device info: ', device)
  }

  useEffect(() => {
    getConnection(dispatch)
    OneSignal.init('99a5a234-ed7d-48a6-9738-4cf5a7a4fbec')
    OneSignal.inFocusDisplaying(2) // this means that it should not give a notification inside app

    OneSignal.addEventListener('received', onReceived)
    OneSignal.addEventListener('opened', onOpened)
    OneSignal.addEventListener('ids', onIds)

    return function cleanup() {
      OneSignal.removeEventListener('received', onReceived)
      OneSignal.removeEventListener('opened', onOpened)
      OneSignal.removeEventListener('ids', onIds)
    }
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
