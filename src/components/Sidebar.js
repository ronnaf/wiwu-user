import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  View,
  Icon
} from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { logout } from '../actions/user/logout.action'
import _ from 'lodash'
import { images } from '../assets/assets'
import Spacer from './Spacer'

const AppName = styled(Text)`
  font-weight: bold;
  font-size: 26px;
`

const Sidebar = props => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user.current)
  const routes = [
    { title: 'Home', routeName: 'UserHome' },
    { title: 'Emergency Requests', routeName: 'UserRequestList' },
    { title: 'Settings', routeName: 'UserSettings' }
  ]

  return (
    <Container>
      <Content>
        <View padder>
          {/*<AppName>wiwu</AppName>*/}
          <Image
            style={{ height: 80, width: 80, borderRadius: 40 }}
            resizeMode='cover'
            source={
              !_.isEmpty(user.avatar)
                ? { uri: user.avatar }
                : images.defaultAvatar
            }
          />
          <Spacer height={8} />
          <Text style={{ fontWeight: 'bold' }}>
            {user.firstName} {user.lastName}
          </Text>
          <Text note>{user.email}</Text>
          <Spacer height={8} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Icon
              name={
                user.isUserVerified
                  ? 'checkmark-circle'
                  : 'close-circle-outline'
              }
              style={{
                fontSize: 18,
                marginRight: 4,
                color: user.isUserVerified ? '#47A1EC' : '#EC3924'
              }}
            />
            <Text
              style={{
                fontSize: 14,
                color: user.isUserVerified ? '#47A1EC' : '#000000'
              }}>
              {user.isUserVerified ? 'Verified' : 'Unverified'} User
            </Text>
          </View>
        </View>
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
          <Text note>Logout</Text>
        </ListItem>
      </Content>
    </Container>
  )
}

Sidebar.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default Sidebar
