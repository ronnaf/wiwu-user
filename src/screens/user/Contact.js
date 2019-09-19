import React, { useEffect } from 'react'
import { Linking, Platform } from 'react-native'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import {
  ActionSheet,
  Body,
  Button,
  Container,
  Content,
  Icon,
  List,
  ListItem,
  Right,
  Text,
  View
} from 'native-base'
import {
  EDIT_PIN_COORDINATES,
  EDIT_REGION_COORDINATES
} from '../../actions/map/map.constants'
import { createAction } from 'redux-actions'
import GenericHeader from '../../components/GenericHeader'
import Spacer from '../../components/Spacer'
import Map from '../../components/Map'
import GenericField from '../../components/GenericField'
import _ from 'lodash'

const Contact = props => {
  const dispatch = useDispatch()
  const { navigation } = props
  const contact = navigation.getParam('contact', {})
  const { latitude, longitude } = contact.location

  useEffect(() => {
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
  }, [])

  /**
   * opens action sheet to show different contact numbers
   * @param string type - [sms, call]
   */
  const openActionSheet = type => {
    const options = [...contact.numbers, 'Cancel']
    ActionSheet.show(
      {
        options,
        cancelButtonIndex: options.length - 1,
        destructiveButtonIndex: options.length - 1,
        title: 'Select number'
      },
      buttonIndex => {
        if (buttonIndex < options.length - 1) {
          const link =
            type === 'sms'
              ? 'sms'
              : Platform.OS === 'android'
              ? 'tel'
              : 'telprompt'
          Linking.openURL(
            `${link}:${_.replace(contact.numbers[buttonIndex], '-', '')}`
          )
        }
      }
    )
  }

  return (
    <Container>
      <GenericHeader title={'Contact'} type='back' />
      <Content padder>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{contact.name}</Text>
        <Spacer height={4} />
        <Text note>{contact.address}</Text>
        <Spacer height={8} />
        <View style={{ flexDirection: 'row' }}>
          <Button
            style={{ marginRight: 8 }}
            small
            rounded
            onPress={() => {
              contact.numbers.length <= 1
                ? Linking.openURL(
                    `sms:${_.replace(contact.numbers[0], '-', '')}`
                  )
                : openActionSheet('sms')
            }}>
            <Icon name={'chatboxes'} />
          </Button>
          <Button
            style={{ marginRight: 8 }}
            small
            rounded
            onPress={() => {
              contact.numbers.length <= 1
                ? Linking.openURL(
                    `tel:${_.replace(contact.numbers[0], '-', '')}`
                  )
                : openActionSheet('call')
            }}>
            <Icon name={'call'} />
          </Button>
        </View>
        <Spacer height={24} />

        <GenericField
          label={'Contact Numbers'}
          CustomComponent={
            <List>
              {contact.numbers.map(number => (
                <ListItem
                  key={number}
                  style={{ marginLeft: 0 }}
                  onPress={() =>
                    Linking.openURL(`tel:${_.replace(number, '-', '')}`)
                  }>
                  <Body>
                    <Text>{number}</Text>
                  </Body>
                  <Right
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end'
                    }}>
                    <Icon style={{ color: 'green' }} name={'call'} />
                    <Icon style={{ marginLeft: 16 }} name={'arrow-forward'} />
                  </Right>
                </ListItem>
              ))}
            </List>
          }
        />

        <GenericField
          label={'Location'}
          CustomComponent={
            <View style={{ height: 300 }}>
              <Map />
            </View>
          }
        />
      </Content>
    </Container>
  )
}

Contact.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default Contact
