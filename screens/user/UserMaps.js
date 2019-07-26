import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Constants, MapView } from 'expo'
import { Container, Header, Left, Button, Icon, Body, Right } from 'native-base'
import UserFooter from '../../components/UserFooter'

const UserMaps = props => {
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

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body />
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
