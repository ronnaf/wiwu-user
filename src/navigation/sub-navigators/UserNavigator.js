import { createDrawerNavigator } from 'react-navigation'

import UserHome from '../../screens/user/UserHome'
import UserMaps from '../../screens/user/UserMaps'
import ContactDirectories from '../../screens/user/ContactDirectories'
import UserRequest from '../../screens/user/UserRequest'
import UserRequestAdd from '../../screens/user/UserRequestAdd'
import UserSettings from '../../screens/user/UserSettings'
import Sidebar from '../../components/Sidebar'

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
      screen: ContactDirectories
    },
    UserRequest: {
      screen: UserRequest
    },
    UserRequestAdd: {
      screen: UserRequestAdd
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
