import React, { useState, useEffect, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from 'native-base'
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo
} from 'react-native-twilio-video-webrtc'
import PropTypes from 'prop-types'
import { resetToken } from '../actions/twilio/resetToken.action'
import showToast from '../helpers/toast.helper'
import { setJoinedRoom } from '../actions/twilio/setJoinedVideo'

const Twilio = props => {
  const dispatch = useDispatch()
  const { setStatus, status, roomName } = props
  const [videoTracks, setVideoTracks] = useState(new Map())
  const token = useSelector(state => state.twilio.token)
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false)
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
    if (token && !hasJoinedRoom) {
      joinRoom()
      setHasJoinedRoom(true)
    }
  })

  const joinRoom = () => {
    try {
      twilioVideo.current.connect({
        roomName,
        accessToken: token
      })
      setStatus('connecting')
      dispatch(setJoinedRoom(true))
    } catch (error) {
      console.log(`ERROR: ${error}`)
      showToast(error.message)
    }
  }

  const leaveRoom = async () => {
    setStatus('disconnected')
    twilioVideo.current.disconnect()
    setHasJoinedRoom(false)
    dispatch(resetToken())
    dispatch(setJoinedRoom(false))
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
    const tracks = videoTracks
    tracks.delete(track.trackSid)
    setVideoTracks(tracks)
  }

  return (
    <View style={styles.container}>
      {(status === 'connected' || status === 'connecting') && (
        <View styles={styles.callContainer}>
          {status === 'connected' && (
            <View style={styles.remoteGrid}>
              {Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
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

Twilio.propTypes = {
  setStatus: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired
}

export default Twilio
