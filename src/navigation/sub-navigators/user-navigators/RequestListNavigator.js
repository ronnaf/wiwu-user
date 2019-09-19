import { createStackNavigator } from 'react-navigation'
import UserRequestList from '../../../screens/user/UserRequestList'

const RequestListNavigator = createStackNavigator(
  {
    UserRequestList: {
      screen: UserRequestList
    }
  },
  {
    headerMode: 'none'
  }
)

export default RequestListNavigator
