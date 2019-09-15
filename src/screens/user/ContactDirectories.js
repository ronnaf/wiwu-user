import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
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

const ContactDirectories = props => {
  const dispatch = useDispatch()
  const contacts = useSelector(state => state.contacts.list)
  const [activeTab, setActiveTab] = useState('medical')
  const activeContacts = contacts.filter(e => e.department === activeTab)

  useEffect(() => {
    dispatch(getContacts())
  }, [])

  return (
    <Container>
      {/*<Modal isVisible={isModalVisible}>*/}
      {/*  <View style={styles.modalContent}>*/}
      {/*    <Card>*/}
      {/*      <CardItem header>*/}
      {/*        <Text>Name: {modalContent.name}</Text>*/}
      {/*      </CardItem>*/}
      {/*      <CardItem>*/}
      {/*        <Text>Address: {modalContent.address}</Text>*/}
      {/*      </CardItem>*/}
      {/*      <CardItem>*/}
      {/*        <Text>Numbers: {modalContent.numbers.join()}</Text>*/}
      {/*      </CardItem>*/}
      {/*      <CardItem footer>*/}
      {/*        <Button*/}
      {/*          block*/}
      {/*          success*/}
      {/*          onPress={() => {*/}
      {/*            const { latitude, longitude } = modalContent.location*/}
      {/*            dispatch(*/}
      {/*              createAction(EDIT_PIN_COORDINATES)({*/}
      {/*                latitude,*/}
      {/*                longitude*/}
      {/*              })*/}
      {/*            )*/}
      {/*            dispatch(*/}
      {/*              createAction(EDIT_REGION_COORDINATES)({*/}
      {/*                latitude,*/}
      {/*                longitude*/}
      {/*              })*/}
      {/*            )*/}
      {/*            setModalVisibility(false)*/}
      {/*            props.navigation.navigate('UserMaps')*/}
      {/*          }}>*/}
      {/*          <Text>Find In Maps</Text>*/}
      {/*        </Button>*/}
      {/*        <Button block danger onPress={() => setModalVisibility(false)}>*/}
      {/*          <Text>Hide Modal</Text>*/}
      {/*        </Button>*/}
      {/*      </CardItem>*/}
      {/*    </Card>*/}
      {/*  </View>*/}
      {/*</Modal>*/}

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
          <Input placeholder='Search responders...' />
        </Item>
      </View>
      <Content>
        <List>
          {activeContacts.map(contact => (
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
