import React from 'react'
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

import GenericHeader from '../../components/GenericHeader'
import Footer from '../../components/Footer'
import { contacts } from '../../constants/dummy-contacts.const'

const ContactDirectories = props => {
  const dispatch = useDispatch()
  return (
    <Container>
      <GenericHeader
        title='Responders'
        type='drawer'
        hasSegment
        SegmentComponent={() => (
          <Segment>
            <Button first>
              <Text>Police</Text>
            </Button>
            <Button>
              <Text>Fire</Text>
            </Button>
            <Button last active>
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
          {contacts.map(hospital => (
            <ListItem key={hospital.name} thumbnail>
              <Left />
              <Body>
                <Text>{hospital.name}</Text>
                <Text note numberOfLines={1}>
                  {hospital.address}
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
