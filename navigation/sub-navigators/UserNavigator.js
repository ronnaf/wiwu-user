import { createStackNavigator } from 'react-navigation'
import UserHome from '../../screens/user/UserHome'
import UserMaps from '../../screens/user/UserMaps'

const UserNavigator = createStackNavigator(
  {
    UserHome: {
      screen: UserHome
    },
    UserMaps: {
      screen: UserMaps
    }
  },
  {
    headerMode: 'none'
  }
)

export default UserNavigator
