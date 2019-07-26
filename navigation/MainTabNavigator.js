/**
 * NOT IN USE
 */

import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import LoginScreen from '../screens/shared/LoginScreen'
import MapsScreen from '../screens/MapsScreen'
import LoginScreen from '../screens/LoginScreen'
import LinksScreen from '../screens/LinksScreen'
import SettingsScreen from '../screens/SettingsScreen'
import ContactDirectoriesScreen from '../screens/ContactDirectoriesScreen'
// import PracticeScreen from '../screens/PracticeScreen'

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

const MapsStack = createStackNavigator(
  {
    Links: MapsScreen
  },
  config
)

MapsStack.navigationOptions = {
  tabBarLabel: 'Maps',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
    />
  )
}

MapsStack.path = ''

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

const ContactDirectoriesStack = createStackNavigator(
  {
    ContactDirectories: ContactDirectoriesScreen
  },
  config
)

ContactDirectoriesStack.navigationOptions = {
  tabBarLabel: 'Contact Directories',
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

ContactDirectoriesStack.path = ''

// const PracticeStack = createStackNavigator(
//   {
//     Practice: PracticeScreen
//   },
//   config
// )

// PracticeStack.navigationOptions = {
//   tabBarLabel: 'Practice',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-information-circle${focused ? '' : '-outline'}`
//           : 'md-information-circle'
//       }
//     />
//   )
// }

// PracticeStack.path = ''

const tabNavigator = createBottomTabNavigator({
  LoginStack,
  MapsStack,
  LinksStack,
  SettingsStack,
  ContactDirectoriesStack
  // PracticeStack
})

tabNavigator.path = ''

export default tabNavigator
