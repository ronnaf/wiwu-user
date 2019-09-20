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
import NavigationService from '../../navigation/NavigationService'
import Footer from '../../components/Footer'

const EmergencyAlertsList = props => {
  return (
    <Container>
      <GenericHeader title='Emergency Alerts' type='drawer' />
      <Content padder>
        <List>
          {[1, 2, 3, 4].map(num => (
            <ListItem key={num} thumbnail style={{ marginLeft: 0 }}>
              <Left>
                <Thumbnail source={images.logo} />
              </Left>
              <Body>
                <Text>
                  NDRRMC: Orange Heavy Rainfall Warning. Matinding pag-ulan sa
                  Metro Manila, Cavite, Batangas, at Rizal ang mararanasan dulot
                  ng HABAGAT
                </Text>
                <Text note numberOfLines={1}>
                  {moment(new Date()).format('MMM DD, YYYY - hh:mmA')}
                </Text>
              </Body>
            </ListItem>
          ))}
        </List>
      </Content>
      <Footer active='notifications' />
    </Container>
  )
}

export default EmergencyAlertsList
