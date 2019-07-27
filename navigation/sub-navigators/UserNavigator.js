import { createSwitchNavigator } from 'react-navigation'
import UserHome from '../../screens/user/UserHome'
import UserMaps from '../../screens/user/UserMaps'
import ContactDirectories from '../../screens/user/ContactDirectories'

const UserNavigator = createSwitchNavigator(
  {
    UserHome: {
      screen: UserHome
    },
    UserMaps: {
      screen: UserMaps
    },
    UserContactDirectories: {
      screen: ContactDirectories
    }
  },
  {
    headerMode: 'none'
  }
)

export default UserNavigator
