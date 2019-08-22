import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'
import { Container, Content, Text, List, ListItem } from 'native-base'
import { useDispatch } from 'react-redux'

import { logout } from '../actions/user/logout.action'

const Sidebar = props => {
  const dispatch = useDispatch()
  const routes = [
    { title: 'Profile', routeName: 'UserProfile' },
    { title: 'Settings', routeName: 'UserSettings' }
  ]

  return (
    <Container>
      <Content>
        <Image
          source={{
            uri:
              'https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/drawer-cover.png'
          }}
          style={{
            height: 120,
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
        <List
          dataArray={routes}
          renderRow={data => {
            return (
              <ListItem
                button
                onPress={() => props.navigation.navigate(data.routeName)}>
                <Text>{data.title}</Text>
              </ListItem>
            )
          }}
        />
        <ListItem button onPress={() => dispatch(logout())}>
          <Text>Logout</Text>
        </ListItem>
      </Content>
    </Container>
  )
}

Sidebar.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default Sidebar
