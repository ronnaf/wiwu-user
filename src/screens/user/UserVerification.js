import React, { useState, useEffect, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Button, Text, Body } from 'native-base'
import Icon from 'react-native-vector-icons/AntDesign'
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo
} from 'react-native-twilio-video-webrtc'
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    callContainer: {
      flex: 1,
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0
    },
    button: {
      marginTop: 100
    },
    localVideo: {
      flex: 1,
      width: 150,
      height: 250,
      position: 'absolute',
      right: 10,
      bottom: 10
    },
    remoteGrid: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: 'yellow'
    },
    remoteVideo: {
      marginTop: 20,
      marginLeft: 10,
      marginRight: 10,
      width: 100,
      height: 120,
      backgroundColor: 'red'
    },
    optionsContainer: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      height: 100,
      backgroundColor: 'blue',
      flexDirection: 'row',
      alignItems: 'center'
    },
    optionButton: {
      width: 60,
      height: 60,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 100 / 2,
      backgroundColor: 'grey',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })

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
    if (error) {
      console.log(`ERROR: ${error.message}`)
    }
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
    showToast(`${participant.identity} added ${track.trackSid}`)
    console.log('participant', participant)
    console.log('track', track)
    setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track.trackSid,
          {
            participantSid: participant.sid,
            participantIdentity: participant.identity,
            videoTrackSid: track.trackSid,
            trackName: track.trackName,
            enabled: true
          }
        ]
      ])
    )
  }

  const onParticipantRemovedVideoTrack = ({ participant, track }) => {
    console.log(`${participant.identity} removed ${track.trackSid}`)
    const tracks = videoTracks
    tracks.delete(track.trackSid)
    setVideoTracks(tracks)
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
      {(status === 'connected' || status === 'connecting') && (
        <View styles={styles.callContainer}>
          {status === 'connected' && (
            <View style={styles.remoteGrid}>
              {Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                console.log('trackSid', trackSid)
                console.log('trackIdentifier', trackIdentifier)
                return (
                  <TwilioVideoParticipantView
                    enabled
                    styles={styles.remoteVideo}
                    key={trackSid}
                    trackIdentifier={trackIdentifier}
                  />
                )
              })}
            </View>
          )}
          <View styles={styles.optionsContainer}>
            <TouchableOpacity
              onPress={() => leaveRoom()}
              style={styles.optionButton}>
              <Text>End</Text>
            </TouchableOpacity>
            <TwilioVideoLocalView enabled style={styles.localVideo} />
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
