import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, AppState } from 'react-native'
import MapView from 'react-native-maps'
import { Toast, Container, Button, Icon } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'
import { createAction } from 'redux-actions'

import { EDIT_COORDINATES } from '../actions/map/map.constants'

const Map = props => {
  const [appState, changeAppState] = useState('active')
  const coordinates = useSelector(state => state.map.coordinates)
  const dispatch = useDispatch()
  const ref = useRef()
  ref.current = appState

  const getCurrentPosition = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        dispatch(
          createAction(EDIT_COORDINATES)({
            latitude,
            longitude
          })
        )
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
    if (!props.isUserSettings) {
      getCurrentPosition()
      AppState.addEventListener('change', _handleAppStateChange)
      return function cleanup() {
        AppState.removeEventListener('change', _handleAppStateChange)
      }
    }
  }, [])

  return (
    <Container>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          region={coordinates}
          onRegionChangeComplete={e => createAction(EDIT_COORDINATES)(e)}
          showsUserLocation
          onPress={e =>
            dispatch(createAction(EDIT_COORDINATES)(e.nativeEvent.coordinate))
          }>
          <MapView.Marker coordinate={coordinates} />
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

export default Map
