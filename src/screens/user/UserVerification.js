import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Image, TouchableOpacity } from 'react-native'
import { Button, Text } from 'native-base'
import Icon from 'react-native-vector-icons/AntDesign'
import * as ImagePicker from 'expo-image-picker'
import GenericHeader from '../../components/GenericHeader'
import Spacer from '../../components/Spacer'
import Twilio from '../../components/Twilio'
import { getToken } from '../../actions/twilio/getToken.action'
import { uploadId } from '../../actions/user/uploadId.action'
import {
  requestCamera,
  requestMicrophone
} from '../../helpers/permission.helper'
import { showCameraActionSheet } from '../../helpers/camera.helper'

const UserVerification = () => {
  const dispatch = useDispatch()
  const [status, setStatus] = useState('disconnected')
  const identity = useSelector(state => state.user.current.uid)
  const roomName = useSelector(state => state.user.current.email)
  const [permissionCamera, setPermissionCamera] = useState(false)
  const [permissionAudio, setPermissionAudio] = useState(false)
  const [idImage, setIdImage] = useState()

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
    <View
      style={{
        flex: 1,
        backgroundColor: 'white'
      }}>
      <GenericHeader title='Identity Verification' type='drawer' />
      {status === 'disconnected' && (
        <View
          style={{
            width: '100%',
            height: '100%'
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button
              onPress={() => dispatch(getToken(identity, roomName))}
              style={{}}
              transparent>
              <Icon name='videocamera' size={30} />
            </Button>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text
              style={{
                color: 'grey',
                textAlignVertical: 'center',
                textAlign: 'center'
              }}>
              Join a video chat room with a representative.
              {'\n'}- or -{'\n'}
              Upload a picture of a valid ID.
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() =>
                showCameraActionSheet(
                  (fieldName, uri) => {
                    setIdImage(uri)
                  },
                  'idImage',
                  'Take Photo',
                  'Select an ID',
                  ImagePicker.MediaTypeOptions.Images
                )
              }
              style={{ margin: 20 }}
              transparent>
              <Icon name='upload' size={30} />
            </TouchableOpacity>
          </View>
          <Image
            style={{ height: '30%', width: '100%' }}
            resizeMode='contain'
            source={{ uri: idImage }}
          />
          <Spacer height={16} />
          {idImage ? (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button onPress={() => dispatch(uploadId(idImage))}>
                <Text>Upload Photo</Text>
              </Button>
            </View>
          ) : (
            <Spacer height={16} />
          )}
        </View>
      )}
      <Twilio setStatus={setStatus} status={status} roomName={roomName} />
    </View>
  )
}

export default UserVerification
