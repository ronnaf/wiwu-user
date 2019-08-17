import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, AppState } from 'react-native'
import MapView from 'react-native-maps'
import Constants from 'expo-constants'
import { Toast, Container } from 'native-base'
import * as Location from 'expo-location'

import GenericHeader from '../../components/GenericHeader'

const UserMaps = props => {
  const [appState, changeAppState] = useState('active')
  const ref = useRef()
  ref.current = appState

  const [mapRegion, mapRegionChange] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  const [location, locationChange] = useState({
    latitude: 37.78825,
    longitude: -122.4324
  })

  const _handleAppStateChange = async nextAppState => {
    if (ref.current.match(/inactive|background/) && nextAppState === 'active') {
      await navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          locationChange({
            latitude,
            longitude
          })
          mapRegionChange({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          })
        },
        error =>
          Toast.show({
            text: error.message,
            buttonText: 'Okay'
          }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      )
    }
    changeAppState(nextAppState)
  }

  const checkStatus = async () => {
    if (!(await Location.hasServicesEnabledAsync())) {
      props.navigation.navigate('Home')
      Toast.show({
        position: 'top',
        text: 'Turn on location',
        buttonText: 'Okay'
      })
    }
  }

  checkStatus()

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange)
    navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords
        locationChange({
          latitude,
          longitude
        })
        mapRegionChange({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        })
      },
      e => {
        console.log(e)
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    )
    return function cleanup() {
      AppState.removeEventListener('change', _handleAppStateChange)
    }
  }, [])

  return (
    <Container>
      <GenericHeader title='Maps' openDrawer={props.navigation.openDrawer} />
      <View style={styles.container}>
        <MapView
          style={{ alignSelf: 'stretch', height: '100%' }}
          region={mapRegion}
          onRegionChangeComplete={mapRegionChange}
          onPress={e => locationChange(e.nativeEvent.coordinate)}>
          <MapView.Marker coordinate={location} />
        </MapView>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  }
})

export default UserMaps
