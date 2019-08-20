import { AppRegistry } from 'react-native'
import App from './src/App'
import WidgetTask from './src/WidgetTask'

AppRegistry.registerComponent('wiwu', () => App)
AppRegistry.registerHeadlessTask('WidgetTask', () => WidgetTask)
