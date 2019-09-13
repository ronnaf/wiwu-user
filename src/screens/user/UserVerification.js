import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { Button, Text, Body } from 'native-base'
import Icon from 'react-native-vector-icons/AntDesign'
import GenericHeader from '../../components/GenericHeader'
import Spacer from '../../components/Spacer'
import Twilio from '../../components/Twilio'
import { getToken } from '../../actions/twilio/getToken.action'
import {
  requestCamera,
  requestMicrophone
} from '../../helpers/permission.helper'

const UserVerification = () => {
  const dispatch = useDispatch()
  const [status, setStatus] = useState('disconnected')
  const identity = useSelector(state => state.user.current.uid)
  const roomName = useSelector(state => state.user.current.email)
  const [permissionCamera, setPermissionCamera] = useState(false)
  const [permissionAudio, setPermissionAudio] = useState(false)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    }
  })

  useEffect(() => {
    if (!permissionCamera && !permissionAudio) {
      requestPermissions()
    }
  })

  const requestPermissions = async () => {
    await setPermissionCamera(await requestCamera())
    await setPermissionAudio(await requestMicrophone())
  }

  return (
    <View style={styles.container}>
      <GenericHeader title='Identity Verification' type='drawer' />
      {status === 'disconnected' && (
        <View
          style={{
            marginTop: 50,
            width: '100%',
            height: '50%',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Body style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button
              onPress={() => dispatch(getToken(identity, roomName))}
              style={{}}
              transparent>
              <Icon name='videocamera' size={30} />
            </Button>
          </Body>
          <Text style={{ color: 'grey' }}>
            Join a video chat room with a representative.
          </Text>
          <Spacer height={16} />
          <Text style={{ color: 'grey' }}> - or - </Text>
          <Spacer height={16} />
          <Text style={{ color: 'grey' }}>Send a picture of a valid ID.</Text>
          <Body style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button onPress={() => {}} style={{ margin: 20 }} transparent>
              <Icon name='upload' size={30} />
            </Button>
          </Body>
        </View>
      )}
      <Twilio setStatus={setStatus} status={status} roomName={roomName} />
    </View>
  )
}

export default UserVerification
