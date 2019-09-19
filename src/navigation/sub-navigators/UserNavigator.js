import { createDrawerNavigator } from 'react-navigation'

import UserHome from '../../screens/user/UserHome'
import UserMaps from '../../screens/user/UserMaps'
import UserRequest from '../../screens/user/UserRequest'
import UserSettings from '../../screens/user/UserSettings'
import UserVerification from '../../screens/user/UserVerification'
import Sidebar from '../../components/Sidebar'
import ContactsNavigator from './user-navigators/ContactsNavigator'
import RequestListNavigator from './user-navigators/RequestListNavigator'
import EmergencyAlertsNavigator from './user-navigators/EmergencyAlertsNavigator'

const UserNavigator = createDrawerNavigator(
  {
    UserHome: {
      screen: UserHome
    },
    UserSettings: {
      screen: UserSettings
    },
    UserMaps: {
      screen: UserMaps
    },
    UserContactDirectories: {
      screen: ContactsNavigator
    },
    UserRequest: {
      screen: UserRequest
    },
    UserVerification: {
      screen: UserVerification
    },
    UserRequestList: {
      screen: RequestListNavigator
    },
    EmergencyAlertsList: {
      screen: EmergencyAlertsNavigator
    }
  },
  {
    contentComponent: Sidebar,
    drawerPosition: 'left',
    drawerType: 'slide',
    useNativeAnimations: true
  }
)

export default UserNavigator
