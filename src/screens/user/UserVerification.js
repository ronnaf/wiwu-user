import React, { useState, useEffect, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View } from 'react-native'
import { Button, Text, Icon, Body } from 'native-base'
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo
} from 'react-native-twilio-video-webrtc'
import { TouchableOpacity } from 'react-native-gesture-handler'
import GenericHeader from '../../components/GenericHeader'
import Spacer from '../../components/Spacer'
import { getToken } from '../../actions/twilio/getToken.action'
import { resetToken } from '../../actions/twilio/resetToken.action'
import showToast from '../../helpers/toast.helper'
import {
  requestCamera,
  requestMicrophone
} from '../../helpers/permission.helper'

const UserVerification = props => {
  const [status, setStatus] = useState('disconnected')
  const [videoTracks, setVideoTracks] = useState(new Map())
  const identity = useSelector(state => state.user.current.uid)
  const token = useSelector(state => state.twilio.token)
  const roomName = useSelector(state => state.user.current.email)
  const [permissionCamera, setPermissionCamera] = useState(false)
  const [permissionAudio, setPermissionAudio] = useState(false)
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false)
  const dispatch = useDispatch()
  const twilioVideo = createRef()

  useEffect(() => {
    if (!permissionCamera && !permissionAudio) {
      requestPermissions()
    }
    if (token && !hasJoinedRoom) {
      joinRoom()
      setHasJoinedRoom(true)
    }
  })

  const requestPermissions = async () => {
    await setPermissionCamera(await requestCamera())
    await setPermissionAudio(await requestMicrophone())
  }

  const joinRoom = () => {
    try {
      twilioVideo.current.connect({
        roomName,
        accessToken: token
      })
      setStatus('connecting')
    } catch (error) {
      console.log(`ERROR: ${error}`)
      showToast(error.message)
    }
  }

  const leaveRoom = () => {
    setStatus('disconnected')
    twilioVideo.current.disconnect()
    setHasJoinedRoom(false)
    dispatch(resetToken())
  }

  const onRoomDidDisconnect = ({ roomName, error }) => {
    console.log(`ERROR: ${error}`)
    showToast(`Disconnected from ${roomName}`)
  }

  const onRoomDidFailToConnect = error => {
    console.log(`ERROR: ${error}`)
    setStatus('disconnected')
  }

  const onRoomDidConnect = () => {
    setStatus('connected')
    showToast('Connected')
  }

  const onParticipantAddedVideoTrack = ({ participant, track }) => {
    showToast(`${participant.identity} added ${track}`)
    console.log('participant', participant)
    console.log('track', track)
    setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track.trackSid,
          {
            participantIdentity: participant.sid,
            videoTrackSid: track.trackSid
          }
        ]
      ])
    )
  }

  const onParticipantRemovedVideoTrack = ({ participant, track }) => {
    console.log(`${participant} removed ${track}`)
    const tracks = videoTracks
    tracks.delete(track.trackSid)
    setVideoTracks(tracks)
  }

  return (
    <View>
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
              title='Connect'
              onPress={() => dispatch(getToken(identity, roomName))}
              style={{}}
              transparent>
              <Icon name='camera' />
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
              <Icon name='camera' />
            </Button>
          </Body>
        </View>
      )}
      {(status === 'connected' || status === 'connecting') && (
        <View
          styles={{
            flex: 1,
            position: 'absolute',
            bottom: 0,
            top: 0,
            left: 0,
            right: 0
          }}>
          {status === 'connected' && (
            <View style={{}}>
              {Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                console.log('trackSid', trackSid)
                console.log('trackIdentifier', trackIdentifier)
                return (
                  <TwilioVideoParticipantView
                    enabled
                    styles={{
                      marginTop: 20,
                      marginLeft: 10,
                      marginRight: 10,
                      width: 100,
                      height: 120
                    }}
                    key={trackSid}
                    trackIdentifier={trackIdentifier}
                  />
                )
              })}
            </View>
          )}
          <View styles={{}}>
            <TouchableOpacity
              onPress={() => leaveRoom()}
              style={{
                width: 60,
                height: 60,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 100 / 2,
                backgroundColor: 'grey',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text>End</Text>
            </TouchableOpacity>
            <TwilioVideoLocalView
              enabled
              style={{
                flex: 1,
                width: 150,
                height: 250,
                position: 'absolute',
                right: 10,
                bottom: 10
              }}
            />
          </View>
        </View>
      )}
      <TwilioVideo
        ref={twilioVideo}
        onRoomDidConnect={onRoomDidConnect}
        onRoomDidDisconnect={onRoomDidDisconnect}
        onRoomDidFailToConnect={onRoomDidFailToConnect}
        onParticipantAddedVideoTrack={onParticipantAddedVideoTrack}
        onParticipantRemovedVideoTrack={onParticipantRemovedVideoTrack}
      />
    </View>
  )
}

export default UserVerification
