import { createStackNavigator } from 'react-navigation'
import ContactDirectories from '../../../screens/user/ContactDirectories'
import Contact from '../../../screens/user/Contact'

const ContactsNavigator = createStackNavigator(
  {
    UserContactDirectories: {
      screen: ContactDirectories
    },
    UserContactInfo: {
      screen: Contact
    }
  },
  {
    headerMode: 'none'
  }
)

export default ContactsNavigator
