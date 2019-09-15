import { createDrawerNavigator } from 'react-navigation'

import UserHome from '../../screens/user/UserHome'
import UserMaps from '../../screens/user/UserMaps'
import ContactDirectories from '../../screens/user/ContactDirectories'
import UserRequest from '../../screens/user/UserRequest'
import UserSettings from '../../screens/user/UserSettings'
import Sidebar from '../../components/Sidebar'
import Contact from '../../screens/user/Contact'

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
    UserContactInfo: {
      screen: Contact
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
