import React, { useRef, useEffect } from 'react'
import { Container, Text, Icon, ActionSheet } from 'native-base'
import {
  Dimensions,
  TouchableOpacity,
  Linking,
  Platform,
  View,
  Image
} from 'react-native'
import { Grid, Row, Col } from 'react-native-easy-grid'
import Lottie from 'lottie-react-native'
import { useDispatch, useSelector } from 'react-redux'
import { createAction } from 'redux-actions'

import { SET_SELECTED_DEPARTMENT } from '../../actions/emergency/emergency.constants'

import Spacer from '../../components/Spacer'
import GenericHeader from '../../components/GenericHeader'
import commonColor from '../../../native-base-theme/variables/commonColor'
import NavigationService from '../../navigation/NavigationService'
import Footer from '../../components/Footer'
import Banner from '../../components/Banner'
import { verifyAlert } from '../../helpers/verifyAlert.helper'
import showToast from '../../helpers/toast.helper'
import { firestore, auth } from '../../firebase'
import { updateVerificationStatus } from '../../actions/user/updateVerificationStatus'
import { images } from '../../assets/assets'

const { contentPadding } = commonColor
const { width } = Dimensions.get('window')
const outerCircle = width - 32
const middleCircle = outerCircle - 80
const innerCircle = middleCircle - 40

const UserHome = () => {
  const isUserVerified = useSelector(state => state.user.current.isUserVerified)
  const isOffline = useSelector(state => state.user.netInfo.isOffline)
  const lottieRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    lottieRef.current.play()
  }, [])

  useEffect(() => {
    try {
      if (!isOffline) {
        const { uid } = auth.currentUser
        const listenerRef = firestore
          .collection('users')
          .doc(uid)
          .onSnapshot(snapshot => {
            if (isUserVerified !== snapshot.data().isUserVerified) {
              dispatch(updateVerificationStatus(snapshot.data().isUserVerified))
            }
          })

        return function cleanup() {
          listenerRef()
        }
      }
    } catch (error) {
      showToast('No connection found')
    }
  }, [isOffline])

  return (
    <Container>
      {!isUserVerified ? (
        <Banner
          type='warn'
          title='Unverified Identity'
          description='Some features may not be available.'
        />
      ) : (
        <View />
      )}
      <GenericHeader title='Home' type='drawer' />
      <Grid style={{ margin: contentPadding }}>
        <Row
          size={5}
          style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Lottie
            ref={lottieRef}
            source={require('../../assets/call.json')}
            style={{ width: '100%', position: 'relative' }}
          />
          <Col
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute'
            }}>
            <TouchableOpacity
              onPress={() =>
                ActionSheet.show(
                  {
                    options: ['Fire', 'Medical', 'Police', 'Cancel'],
                    cancelButtonIndex: 3
                  },
                  buttonIndex => {
                    if (buttonIndex !== 3) {
                      // placeholders until we get the actual numbers
                      Linking.openURL(
                        `${Platform.OS === 'android' ? 'tel' : 'telprompt'}:${
                          buttonIndex === 1
                            ? '0123'
                            : buttonIndex === 2
                            ? '00000'
                            : '00000'
                        }`
                      )
                    }
                  }
                )
              }
              style={{
                height: innerCircle,
                width: innerCircle,
                borderRadius: innerCircle / 2,
                backgroundColor: '#f5d5d3',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Icon
                type='FontAwesome5'
                name='phone'
                style={{ fontSize: 112, color: '#dd0000' }}
              />
            </TouchableOpacity>
          </Col>
        </Row>
        <Row size={2}>
          <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                color: '#6F706F',
                textTransform: 'uppercase',
                fontFamily: 'dosis-bold'
              }}>
              Tap to call for help
            </Text>
            <Spacer height={8} />
            <Text style={{ color: '#6F706F', fontFamily: 'dosis-regular' }}>
              - or -
            </Text>
            <Spacer height={8} />
            <Text
              style={{
                color: '#6F706F',
                textTransform: 'uppercase',
                fontFamily: 'dosis-bold'
              }}>
              Fill up an emergency form
            </Text>
          </Col>
        </Row>
        <Row size={2} style={{ marginBottom: 8 }}>
          <Col>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                marginLeft: 3,
                marginRight: 3
              }}
              onPress={() => {
                if (!isUserVerified) {
                  verifyAlert()
                } else {
                  NavigationService.navigate('UserRequest')
                  dispatch(createAction(SET_SELECTED_DEPARTMENT)('medical'))
                }
              }}>
              <Image
                source={images.medicalButtonNoText}
                resizeMode={'cover'}
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  borderRadius: 8
                }}
              />
              <Text
                style={{
                  color: '#f6f1ee',
                  fontWeight: 'bold',
                  textTransform: 'lowercase',
                  fontSize: 24,
                  margin: 8
                }}>
                Medical
              </Text>
            </TouchableOpacity>
          </Col>
          <Col>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                marginLeft: 3,
                marginRight: 3
              }}
              onPress={() => {
                if (!isUserVerified) {
                  verifyAlert()
                } else {
                  dispatch(createAction(SET_SELECTED_DEPARTMENT)('fire'))
                  NavigationService.navigate('UserRequest')
                }
              }}>
              <Image
                source={images.fireButtonNoText}
                resizeMode={'cover'}
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  borderRadius: 8
                }}
              />
              <Text
                style={{
                  color: '#f6f1ee',
                  fontWeight: 'bold',
                  textTransform: 'lowercase',
                  fontSize: 24,
                  margin: 8
                }}>
                Fire
              </Text>
            </TouchableOpacity>
          </Col>
          <Col>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                marginLeft: 3,
                marginRight: 3
              }}
              onPress={() => {
                if (!isUserVerified) {
                  verifyAlert()
                } else {
                  NavigationService.navigate('UserRequest')
                  dispatch(createAction(SET_SELECTED_DEPARTMENT)('police'))
                }
              }}>
              <Image
                source={images.policeButtonNoText}
                resizeMode={'cover'}
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  borderRadius: 8
                }}
              />
              <Text
                style={{
                  color: '#f6f1ee',
                  fontWeight: 'bold',
                  textTransform: 'lowercase',
                  fontSize: 24,
                  margin: 8
                }}>
                Police
              </Text>
            </TouchableOpacity>
          </Col>
        </Row>
      </Grid>
      <Footer active='home' />
    </Container>
  )
}

export default UserHome
