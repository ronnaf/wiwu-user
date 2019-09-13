import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AsyncStorage, NetInfo, StyleSheet } from 'react-native'
import { createAction } from 'redux-actions'
import Spinner from 'react-native-loading-spinner-overlay'
import { Root, View, Text } from 'native-base'
import nativeFirebase from 'react-native-firebase'

import { NET_INFO } from '../actions/user/user.constants'
import { syncDb } from '../actions/emergency/syncDb.action'

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

    if (isOnline) {
      dispatch(syncDb())
    }

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

    if (isOnline) {
      dispatch(syncDb())
    }

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

  const notificationOnMount = async () => {
    const enabled = await nativeFirebase.messaging().hasPermission()
    console.log(enabled)
    if (!enabled) {
      await nativeFirebase.messaging().requestPermission()
    }
    console.log(await nativeFirebase.messaging().getToken())
    if (!(await AsyncStorage.getItem('fcmToken'))) {
      const fcmToken = await nativeFirebase.messaging().getToken()

      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken)
      }
    }

    const notificationOpen = await nativeFirebase
      .notifications()
      .getInitialNotification()
    console.log(notificationOpen)
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification
      console.log(title, body)
    }
  }

  useEffect(() => {
    getConnection(dispatch)
    notificationOnMount()

    nativeFirebase.notifications().onNotification(notification => {
      console.log(notification)
    })
    //
    // const notificationDisplayedListener = nativeFirebase
    //   .notifications()
    //   .onNotificationDisplayed(notification => {
    //     const { title, body } = notification
    //     console.log(title, body)
    //   })
    // const notificationOpenedListener = nativeFirebase
    //   .notifications()
    //   .onNotificationOpened(notificationOpen => {
    //     const { title, body } = notificationOpen.notification
    //     console.log(title, body)
    //   })

    nativeFirebase.messaging().onMessage(message => {
      //process data message
      console.log(JSON.stringify(message))
    })

    return function cleanup() {
      // notificationListener()
      // notificationOpenedListener()
      // messageListener()
      // notificationDisplayedListener()
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
