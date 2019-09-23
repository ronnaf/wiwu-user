import React, { useState, useEffect, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, TouchableOpacity, Text } from 'react-native'
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo
} from 'react-native-twilio-video-webrtc'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { resetToken } from '../actions/twilio/resetToken.action'
import showToast from '../helpers/toast.helper'
import { setJoinedRoom } from '../actions/twilio/setJoinedVideo'
import { Spinner } from 'native-base'

const Twilio = props => {
  const dispatch = useDispatch()
  const { setStatus, status, roomName } = props
  const [videoTracks, setVideoTracks] = useState(new Map())
  const token = useSelector(state => state.twilio.token)
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false)
  const twilioVideo = createRef()

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
      showToast(error.message)
    }
  }

  const leaveRoom = async () => {
    twilioVideo.current.disconnect()
    setStatus('disconnected')
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
    <View
      style={{
        flex: 1,
        backgroundColor: 'white'
      }}>
      {(status === 'connected' || status === 'connecting') && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            bottom: 0,
            top: 0,
            left: 0,
            right: 0
          }}>
          {status === 'connected' && (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}>
              {videoTracks.size === 0 ? (
                <View style={{ width: '100%', height: '100%' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      width: '100%',
                      alignItems: 'center',
                      marginTop: '40%'
                    }}>
                    <Text style={{ color: 'grey' }}>
                      Please wait for a representative to connect.
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      width: '100%',
                      alignItems: 'center'
                    }}>
                    <Spinner color='blue' />
                  </View>
                </View>
              ) : (
                Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                  return (
                    <TwilioVideoParticipantView
                      enabled
                      style={{
                        width: '100%',
                        height: '100%'
                      }}
                      key={trackSid}
                      trackIdentifier={trackIdentifier}
                    />
                  )
                })
              )}
            </View>
          )}
          <View
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              right: 0,
              height: 100,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <TouchableOpacity
              onPress={() => {
                leaveRoom()
                dispatch(setJoinedRoom(false))
              }}
              style={{
                width: 60,
                height: 60,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 100 / 2,
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Icon name='call-end' size={30} color='red' />
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

Twilio.propTypes = {
  setStatus: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired
}

export default Twilio
