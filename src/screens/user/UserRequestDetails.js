import React from 'react'
import { Button, Container, Content, Form, Text, View } from 'native-base'
import GenericHeader from '../../components/GenericHeader'
import { Image } from 'react-native'
import { images } from '../../assets/assets'
import Spacer from '../../components/Spacer'
import moment from 'moment'
import GenericField from '../../components/GenericField'
import _ from 'lodash'
import { showCameraActionSheet } from '../../helpers/camera.helper'
import * as ImagePicker from 'expo-image-picker'
import Map from '../../components/Map'

const UserRequestDetails = props => {
  return (
    <Container>
      <GenericHeader title='Request Details' type='back' />
      <Content padder>
        <Image
          style={{ height: 50, width: 50, borderRadius: 25 }}
          resizeMode='cover'
          source={images.police}
        />
        <Spacer height={8} />

        <Text style={{ fontSize: 24 }}>
          You requested for{' '}
          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>police</Text>{' '}
          assistance
        </Text>
        <Spacer height={4} />

        <Text note>
          {moment(new Date()).format('MMM DD, YYYY | hh:mmA')} - PENDING
        </Text>
        <Spacer height={16} />

        <Text>I need help!</Text>
        <Text>
          I got caught up in a kidnapping situation, and there was a masked man
          and he held a gun on my head and threatened to kill me if I call the
          police
        </Text>
        <Spacer height={16} />

        <GenericField
          label={'Media Attached'}
          CustomComponent={
            <Image
              style={{ height: 300, width: '100%' }}
              resizeMode='cover'
              source={images.defaultThumbnail}
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
