import React, { useState, useEffect } from 'react'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Provider } from 'react-redux'
import { StyleProvider } from 'native-base'
import { PersistGate } from 'redux-persist/integration/react'

import getTheme from '../native-base-theme/components'
import commonColor from '../native-base-theme/variables/commonColor'
import AppNavigator from './navigation/AppNavigator'
import configureStore from './configureStore'

const { store, persistor } = configureStore()

console.disableYellowBox = true

const onMount = async setFontLoaded => {
  await loadResourcesAsync()
  setFontLoaded(true)
}

export default function App(props) {
  const [fontLoaded, setFontLoaded] = useState(false)

  useEffect(() => {
    onMount(setFontLoaded)
  }, [])

  if (fontLoaded) {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
              <AppNavigator />
            </View>
          </PersistGate>
        </Provider>
      </StyleProvider>
    )
  } else {
    return <View />
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png')
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      'dosis-bold': require('./assets/fonts/Dosis-Bold.ttf'),
      'dosis-extrabold': require('./assets/fonts/Dosis-ExtraBold.ttf'),
      'dosis-extralight': require('./assets/fonts/Dosis-ExtraLight.ttf'),
      'dosis-light': require('./assets/fonts/Dosis-Light.ttf'),
      'dosis-medium': require('./assets/fonts/Dosis-Medium.ttf'),
      'dosis-regular': require('./assets/fonts/Dosis-Regular.ttf'),
      'dosis-semibold': require('./assets/fonts/Dosis-SemiBold.ttf')
    })
  ])
}

// function handleLoadingError(error: Error) {
// In this case, you might want to report the error to your error reporting
// service, for example Sentry
//   console.warn(error)
// }

// function handleFinishLoading(setLoadingComplete) {
//   setLoadingComplete(true)
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
