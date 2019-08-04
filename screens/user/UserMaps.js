import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Linking, Alert, AppState } from 'react-native'
import MapView from 'react-native-maps'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Title
} from 'native-base'
import UserFooter from '../../components/UserFooter'

const askForLocation = async (locationChange, mapRegionChange) => {
  await Location.requestPermissionsAsync()
  await Location.enableNetworkProviderAsync()
  await Location.hasServicesEnabledAsync()
  if (!(await Location.hasServicesEnabledAsync())) {
    Alert.alert(
      '',
      'For a better experience, turn on device location',
      [
        {
          text: 'CANCEL',
          onPress: () => {}
        },
        {
          text: 'OK',
          onPress: () => {
            Linking.openURL('app-settings:')
          }
        }
      ],
      { cancelable: false }
    )
  }
  if (await Location.hasServicesEnabledAsync()) {
    const {
      coords: { latitude, longitude }
    } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation
    })
    locationChange({ latitude, longitude })
    mapRegionChange({
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    })
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation
      },
      ({ coords: { latitude, longitude } }) => {
        locationChange({ latitude, longitude })
        mapRegionChange({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        })
      }
    )
  }
}

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
    if (
      ref.current.match(/inactive|background/) &&
      nextAppState === 'active' &&
      (await Location.hasServicesEnabledAsync())
    ) {
      askForLocation(locationChange, mapRegionChange)
    }
    changeAppState(nextAppState)
  }

  useEffect(() => {
    askForLocation(locationChange, mapRegionChange)
    AppState.addEventListener('change', _handleAppStateChange)
    return function cleanup() {
      AppState.removeEventListener('change', _handleAppStateChange)
    }
  }, [])

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body style={{ flex: 3 }}>
          <Title>Emergency Locations</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='contact' />
          </Button>
        </Right>
      </Header>
      <View style={styles.container}>
        <MapView
          style={{ alignSelf: 'stretch', height: '100%' }}
          region={mapRegion}
          onRegionChangeComplete={mapRegionChange}
          onPress={e => locationChange(e.nativeEvent.coordinate)}>
          <MapView.Marker coordinate={location} />
        </MapView>
      </View>
      <UserFooter active='map' />
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
