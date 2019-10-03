import { createStackNavigator } from 'react-navigation'
import UserRequestList from '../../../screens/user/UserRequestList'
import UserRequestDetails from '../../../screens/user/UserRequestDetails'

const RequestListNavigator = createStackNavigator(
  {
    UserRequestList: {
      screen: UserRequestList
    },
    UserRequestDetails: {
      screen: UserRequestDetails
    }
  },
  {
    headerMode: 'none'
  }
)

export default RequestListNavigator
