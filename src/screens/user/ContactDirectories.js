import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import { createAction } from 'redux-actions'
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Text,
  Body,
  Icon,
  Input,
  Item,
  Segment,
  Button,
  View
} from 'native-base'

import GenericHeader from '../../components/GenericHeader'
import Footer from '../../components/Footer'

import { getContacts } from '../../actions/contact/getContacts.action'
import {
  EDIT_PIN_COORDINATES,
  EDIT_REGION_COORDINATES
} from '../../actions/map/map.constants'

const ContactDirectories = props => {
  const [activeTab, setActiveTab] = useState('medical')
  const dispatch = useDispatch()
  const contacts = useSelector(state => state.contacts.list)
  const activeList = contacts.filter(e => e.department === activeTab)

  useEffect(() => {
    dispatch(getContacts())
  }, [])

  return (
    <Container>
      <GenericHeader
        title='Responders'
        type='drawer'
        hasSegment
        SegmentComponent={() => (
          <Segment>
            <Button
              first
              active={activeTab === 'police'}
              onPress={() => {
                setActiveTab('police')
              }}>
              <Text>Police</Text>
            </Button>
            <Button
              active={activeTab === 'fire'}
              onPress={() => {
                setActiveTab('fire')
              }}>
              <Text>Fire</Text>
            </Button>
            <Button
              last
              active={activeTab === 'medical'}
              onPress={() => {
                setActiveTab('medical')
              }}>
              <Text>Hospital</Text>
            </Button>
          </Segment>
        )}
      />
      <View padder>
        <Text style={styles.title}>Emergency Responders</Text>
        <Item regular>
          <Icon active name='search' />
          <Input placeholder='Search responders...' />
        </Item>
      </View>
      <Content>
        <List>
          {activeList.map(place => (
            <ListItem
              key={place.name}
              thumbnail
              onPress={() => {
                const { latitude, longitude } = place.location
                dispatch(
                  createAction(EDIT_PIN_COORDINATES)({
                    latitude,
                    longitude
                  })
                )
                dispatch(
                  createAction(EDIT_REGION_COORDINATES)({
                    latitude,
                    longitude
                  })
                )
                props.navigation.navigate('UserMaps')
              }}>
              <Left />
              <Body>
                <Text>{place.name}</Text>
                <Text note numberOfLines={1}>
                  {place.address}
                </Text>
              </Body>
              <Right>
                <Icon name='arrow-forward' />
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
      <Footer active='contacts' />
    </Container>
  )
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
    fontWeight: 'bold',
    fontSize: 24
  }
})

export default ContactDirectories
