import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, AppState } from 'react-native'
import MapView from 'react-native-maps'
import { Toast, Container, Button, Icon } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'
import { createAction } from 'redux-actions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

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
      <MapView
        style={styles.mapStyle}
        region={coordinates}
        onRegionChangeComplete={e =>
          dispatch(createAction(EDIT_COORDINATES)(e))
        }
        showsUserLocation
        showsBuilding={true}
        mapType={'hybrid'}
        onPress={e =>
          dispatch(createAction(EDIT_COORDINATES)(e.nativeEvent.coordinate))
        }>
        <MapView.Marker coordinate={coordinates} />
      </MapView>
      <View style={styles.placesStyle}>
        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2}
          autoFocus={false}
          returnKeyType={'search'}
          listViewDisplayed='true'
          fetchDetails={true}
          renderDescription={row => row.description}
          onPress={(data, details = null) => {
            const { lat, lng } = details.geometry.location
            dispatch(
              createAction(EDIT_COORDINATES)({ latitude: lat, longitude: lng })
            )
          }}
          getDefaultValue={() => {
            return ''
          }}
          query={{
            key: 'AIzaSyBwvfQvIxe14wJMbOvSoAGLeaG3t5KSsfM',
            language: 'en',
            components: 'country:ph',
            location: '10.7202, 122.5621',
            radius: 40000, // 40 km within the city
            strictbounds: true,
            types: ['geocode', 'address', 'establishment']
          }}
          styles={{
            poweredContainer: {
              display: 'none'
            },
            row: {
              backgroundColor: '#D5D5D5' // just change this later if the color looks ugly
            },
            textInputContainer: {
              width: '100%'
            },
            description: {
              fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            }
          }}
          nearbyPlacesAPI='GooglePlacesSearch'
          GooglePlacesSearchQuery={{
            rankby: 'distance'
          }}
          GooglePlacesDetailsQuery={{
            fields: 'formatted_address'
          }}
        />
      </View>
      <Button
        rounded
        primary
        onPress={getCurrentPosition}
        style={styles.buttonStyle}>
        <Icon name='add' size={100} style={styles.iconStyle} />
      </Button>
    </Container>
  )
}

const styles = StyleSheet.create({
  placesStyle: {
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  mapStyle: {
    height: '100%',
    alignSelf: 'stretch',
    width: '100%'
  },
  buttonStyle: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    width: 46,
    height: 46
  },
  iconStyle: {
    justifyContent: 'center',
    alignSelf: 'center'
  }
})

export default Map
