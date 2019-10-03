import React, { useEffect } from 'react'
import { Container, Content, Text, View } from 'native-base'
import GenericHeader from '../../components/GenericHeader'
import { Image } from 'react-native'
import { images } from '../../assets/assets'
import Spacer from '../../components/Spacer'
import moment from 'moment'
import GenericField from '../../components/GenericField'
import _ from 'lodash'
import Map from '../../components/Map'
import { createAction } from 'redux-actions'
import {
  EDIT_PIN_COORDINATES,
  EDIT_REGION_COORDINATES
} from '../../actions/map/map.constants'
import { useDispatch } from 'react-redux'

const UserRequestDetails = props => {
  const dispatch = useDispatch()
  const emergency = props.navigation.getParam('emergency', {})

  useEffect(() => {
    dispatch(createAction(EDIT_PIN_COORDINATES)(emergency.location))
    dispatch(createAction(EDIT_REGION_COORDINATES)(emergency.location))
  }, [])

  return (
    <Container>
      <GenericHeader title='Request Details' type='back' />
      <Content padder>
        <Image
          style={{ height: 50, width: 50, borderRadius: 25 }}
          resizeMode='cover'
          source={images[emergency.department]}
        />
        <Spacer height={8} />

        <Text style={{ fontSize: 24 }}>
          You requested for{' '}
          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>
            {emergency.department}
          </Text>{' '}
          assistance
        </Text>
        <Spacer height={4} />

        <Text note>
          {moment(emergency.date).format('MMM DD, YYYY - hh:mmA')} -{' '}
          {_.upperCase(emergency.status)}
        </Text>
        <Spacer height={16} />

        <Text>{emergency.role}</Text>
        <Text>{emergency.description}</Text>
        <Spacer height={16} />

        <GenericField
          label={'Media Attached'}
          CustomComponent={
            <Image
              style={{ height: 300, width: '100%' }}
              resizeMode='cover'
              source={
                emergency.media
                  ? { uri: emergency.media }
                  : images.defaultThumbnail
              }
            />
          }
        />

        <GenericField
          label={'Emergency Location'}
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

export default UserRequestDetails
