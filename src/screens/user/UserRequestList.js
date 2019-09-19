import React, { useEffect } from 'react'
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Text,
  Right,
  Button
} from 'native-base'
import GenericHeader from '../../components/GenericHeader'
import { images } from '../../assets/assets'
import moment from 'moment'

const UserRequestList = props => {
  return (
    <Container>
      <GenericHeader title='Emergency Requests' type='drawer' />
      <Content padder>
        <List>
          {[1, 2, 3, 4].map(num => (
            <ListItem key={num} thumbnail style={{ marginLeft: 0 }}>
              <Left>
                <Thumbnail source={images.police} />
              </Left>
              <Body>
                <Text>
                  You requested for{' '}
                  <Text style={{ fontWeight: 'bold' }}>police</Text> assistance
                </Text>
                <Text note numberOfLines={1}>
                  I need help! - I got caught up in a kidnapping situation
                </Text>
                <Text note numberOfLines={1}>
                  {moment(new Date()).format('MMM DD, YYYY - hh:mmA')}
                </Text>
              </Body>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  )
}

export default UserRequestList
