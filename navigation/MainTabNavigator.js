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
  LinksStack,
  SettingsStack,
  ContactDirectoriesStack
  // PracticeStack
})

tabNavigator.path = ''

export default tabNavigator