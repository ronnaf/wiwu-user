import HomeScreen from '../../screens/user/UserHome'
import Maps from '../../screens/user/UserMaps'
import Directory from '../../screens/user/ContactDirectories'
import SideBar from '../../components/Sidebar'

import { createDrawerNavigator } from 'react-navigation'

const UserRouter = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Home'
      })
    },
    Maps: {
      screen: Maps,
      navigationOptions: ({ navigation }) => ({
        title: 'Maps'
      })
    },
    Directory: {
      screen: Directory,
      navigationOptions: ({ navigation }) => ({
        title: 'Directory'
      })
    }
  },
  {
    contentComponent: SideBar,
    drawerPosition: 'left',
    drawerType: 'slide',
    useNativeAnimations: true,
    initialRouteName: 'Home'
  }
)
export default UserRouter
