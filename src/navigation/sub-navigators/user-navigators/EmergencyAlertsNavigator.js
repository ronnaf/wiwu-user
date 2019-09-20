import { createStackNavigator } from 'react-navigation'
import EmergencyAlertsList from '../../../screens/user/EmergencyAlertsList'

const RequestListNavigator = createStackNavigator(
  {
    EmergencyAlertsList: {
      screen: EmergencyAlertsList
    }
  },
  {
    headerMode: 'none'
  }
)

export default RequestListNavigator
