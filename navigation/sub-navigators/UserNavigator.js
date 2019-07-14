import { createStackNavigator } from 'react-navigation'
import UserHome from '../../screens/user/UserHome'

const UserNavigator = createStackNavigator(
  {
    UserHome: {
      screen: UserHome
    }
  },
  {
    headerMode: 'none'
  }
)

export default UserNavigator
