import { createSwitchNavigator } from 'react-navigation'
import UserHome from '../../screens/user/UserHome'
import UserMaps from '../../screens/user/UserMaps'
import ContactDirectories from '../../screens/user/ContactDirectories'
import UserRequest from '../../screens/user/UserRequest'
import UserRequestAdd from '../../screens/user/UserRequestAdd'
import UserSettings from '../../screens/user/UserSettings'

const UserNavigator = createSwitchNavigator(
  {
    Home: {
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
    headerMode: 'none'
  }
)

export default UserNavigator
