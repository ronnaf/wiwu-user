import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, AppState } from 'react-native'
import MapView from 'react-native-maps'
import { Toast, Container, Button, Icon } from 'native-base'

import GenericHeader from '../../components/GenericHeader'
import Footer from '../../components/Footer'

const UserMaps = props => {
  const [appState, changeAppState] = useState('active')
  const ref = useRef()
  ref.current = appState

  const [mapRegion, mapRegionChange] = useState({
    latitude: 10.7202,
    longitude: 122.5621,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  const [location, locationChange] = useState({
    latitude: 10.7202,
    longitude: -122.4324
  })

  const getCurrentPosition = async () => {
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

  const _handleAppStateChange = async nextAppState => {
    if (ref.current.match(/inactive|background/) && nextAppState === 'active') {
      getCurrentPosition()
    }
    changeAppState(nextAppState)
  }

  useEffect(() => {
    getCurrentPosition()
    AppState.addEventListener('change', _handleAppStateChange)
    navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords
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
      <GenericHeader title='Maps' type='drawer' />
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          region={mapRegion}
          onRegionChangeComplete={mapRegionChange}
          showsUserLocation
          onPress={e => locationChange(e.nativeEvent.coordinate)}>
          <MapView.Marker coordinate={location} />
        </MapView>
      </View>
      {/* Google maps get current position button isnt working */}
      {/* Pls fix icon not centered, thanks */}
      <Button
        rounded
        primary
        onPress={getCurrentPosition}
        style={styles.buttonStyle}>
        <Icon name='add' />
      </Button>
      <Footer active='map' />
    </Container>
  )
}

const styles = StyleSheet.create({
  mapStyle: {
    alignSelf: 'stretch',
    height: '100%'
  },
  buttonStyle: {
    position: 'absolute',
    bottom: 100,
    right: 15,
    width: 50,
    height: 50
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  }
})

export default UserMaps
