import { AppRegistry } from 'react-native'
import App from './App'
import WidgetTask from './WidgetTask'

AppRegistry.registerComponent('wiwu', () => App)
AppRegistry.registerHeadlessTask('WidgetTask', () => WidgetTask)
