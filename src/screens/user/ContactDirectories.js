import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, Linking } from 'react-native'
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
import { getContacts } from '../../actions/contact/getContacts.action'
import NavigationService from '../../navigation/NavigationService'
import GenericHeader from '../../components/GenericHeader'
import Footer from '../../components/Footer'
import Fuse from 'fuse.js'
import _ from 'lodash'

const ContactDirectories = props => {
  const dispatch = useDispatch()
  const contacts = useSelector(state => state.contacts.list)
  const [activeTab, setActiveTab] = useState('medical')
  const [searchedContacts, setSearchedContacts] = useState([])
  const activeContacts = contacts.filter(e => e.department === activeTab)
  const contactsToDisplay = !_.isEmpty(searchedContacts)
    ? searchedContacts
    : activeContacts

  useEffect(() => {
    dispatch(getContacts())
  }, [])

  const searchContacts = input => {
    console.log('[!] searching...', input)
    const fuse = new Fuse(activeContacts, { keys: ['name', 'address'] })
    const result = fuse.search(input)

    setSearchedContacts(result)
  }

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
              onPress={() => setActiveTab('police')}>
              <Text>Police</Text>
            </Button>
            <Button
              active={activeTab === 'fire'}
              onPress={() => setActiveTab('fire')}>
              <Text>Fire</Text>
            </Button>
            <Button
              last
              active={activeTab === 'medical'}
              onPress={() => setActiveTab('medical')}>
              <Text>Hospital</Text>
            </Button>
          </Segment>
        )}
      />
      <View padder>
        <Text style={styles.title}>Emergency Responders</Text>
        <Item regular>
          <Icon active name='search' />
          <Input
            placeholder='Search responders...'
            onChangeText={text => searchContacts(text)}
          />
        </Item>
      </View>
      <Content>
        <List>
          {contactsToDisplay.map(contact => (
            <ListItem
              key={contact.id}
              thumbnail
              onPress={() =>
                NavigationService.navigate('UserContactInfo', { contact })
              }>
              <Left />
              <Body>
                <Text>{contact.name}</Text>
                <Text note numberOfLines={1}>
                  {contact.address}
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
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  }
})

export default ContactDirectories
