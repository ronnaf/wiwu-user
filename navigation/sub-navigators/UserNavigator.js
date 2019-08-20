import { createSwitchNavigator } from 'react-navigation'
import UserHome from '../../screens/user/UserHome'
import UserMaps from '../../screens/user/UserMaps'
import ContactDirectories from '../../screens/user/ContactDirectories'
import UserRequest from '../../screens/user/UserRequest'
import UserRequestAdd from '../../screens/user/UserRequestAdd'

const UserNavigator = createSwitchNavigator({
  Home: {
    screen: UserHome
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
})

export default UserNavigator
