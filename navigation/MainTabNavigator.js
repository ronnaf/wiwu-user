import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import LoginScreen from '../screens/LoginScreen'
import LinksScreen from '../screens/LinksScreen'
import SettingsScreen from '../screens/SettingsScreen'
import PracticeScreen from '../screens/PracticeScreen'
import SignupScreen from '../screens/SignupScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
})

const LoginStack = createStackNavigator(
  {
    Login: LoginScreen
  },
  config
)

LoginStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
}

LoginStack.path = ''

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen
  },
  config
)

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  )
}

LinksStack.path = ''

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
)

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  )
}

SettingsStack.path = ''

const PracticeStack = createStackNavigator(
  {
    Practice: PracticeScreen
  },
  config
)

PracticeStack.navigationOptions = {
  tabBarLabel: 'Practice',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
}

PracticeStack.path = ''

const SignupStack = createStackNavigator(
  {
    Signup: SignupScreen
  },
  config
)

SignupStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
}

SignupStack.path = ''

const tabNavigator = createBottomTabNavigator({
  LoginStack,
  LinksStack,
  SettingsStack,
  PracticeStack,
  SignupStack
})

tabNavigator.path = ''

export default tabNavigator
