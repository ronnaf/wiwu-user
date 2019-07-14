import { createStackNavigator } from 'react-navigation'
import ResponderHome from '../../screens/responder/ResponderHome'

const ResponderNavigator = createStackNavigator({
  ResponderHome: {
    screen: ResponderHome
  }
})

export default ResponderNavigator
