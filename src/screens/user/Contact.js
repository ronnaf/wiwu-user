import React, { useEffect } from 'react'
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

  const openActionSheet = () => {
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
          alert(
            `Feature not yet implemented! - ${contact.numbers[buttonIndex]}`
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
        <Spacer height={16} />
        <View style={{ flexDirection: 'row' }}>
          <Button
            style={{ marginRight: 8 }}
            small
            rounded
            onPress={() => {
              contact.numbers.length <= 1
                ? alert(`Feature not yet implemented! - ${contact.numbers[0]}`)
                : openActionSheet()
            }}>
            <Icon name={'chatboxes'} />
          </Button>
          <Button
            style={{ marginRight: 8 }}
            small
            rounded
            onPress={() => {
              contact.numbers.length <= 1
                ? alert(`Feature not yet implemented! - ${contact.numbers[0]}`)
                : openActionSheet()
            }}>
            <Icon name={'call'} />
          </Button>
        </View>
        <Spacer height={16} />

        <GenericField
          label={'Contact Numbers'}
          CustomComponent={
            <List>
              {contact.numbers.map(number => (
                <ListItem
                  key={number}
                  style={{ marginLeft: 0 }}
                  onPress={() =>
                    alert(`Feature not yet implemented! - ${number}`)
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
