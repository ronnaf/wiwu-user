import React, { useRef, useEffect } from 'react'
import { Container, Text, Icon, ActionSheet } from 'native-base'
import { Dimensions, TouchableOpacity, Linking } from 'react-native'
import { Grid, Row, Col } from 'react-native-easy-grid'
import { LinearGradient } from 'expo-linear-gradient'
import Lottie from 'lottie-react-native'
import { useDispatch } from 'react-redux'
import { createAction } from 'redux-actions'

import { SET_SELECTED_DEPARTMENT } from '../../actions/emergency/emergency.constants'

import Spacer from '../../components/Spacer'
import GenericHeader from '../../components/GenericHeader'
import commonColor from '../../../native-base-theme/variables/commonColor'
import NavigationService from '../../navigation/NavigationService'
import Footer from '../../components/Footer'

const { contentPadding } = commonColor
const { width } = Dimensions.get('window')
const outerCircle = width - 32
const middleCircle = outerCircle - 80
const innerCircle = middleCircle - 80

const UserHome = () => {
  const lottieRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    lottieRef.current.play()
  }, [])

  return (
    <Container>
      <GenericHeader title='Home' type='drawer' />
      <Grid style={{ margin: contentPadding }}>
        <Row size={3} style={{ alignItems: 'center' }}>
          <Lottie ref={lottieRef} source={require('../../assets/call.json')} />
          <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
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
                        `tel:${
                          buttonIndex === 1
                            ? '00000'
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
        <Row size={1.5}>
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
              Choose an emergency
            </Text>
          </Col>
        </Row>
        <Row size={2}>
          <Col>
            <Row style={{ marginBottom: 8 }}>
              <Col>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    NavigationService.navigate('UserRequest')
                    dispatch(createAction(SET_SELECTED_DEPARTMENT)('medical'))
                  }}>
                  <LinearGradient
                    style={{
                      flex: 1,
                      marginRight: 4,
                      borderRadius: 8,
                      padding: 8,
                      justifyContent: 'flex-end'
                    }}
                    colors={['#5433FF', '#20BDFF', '#A5FECB']}
                    start={[0, 1]}
                    end={[1, 0]}>
                    <Text
                      style={{
                        color: '#f6f1ee',
                        fontWeight: 'bold',
                        textTransform: 'lowercase',
                        fontSize: 24
                      }}>
                      Medical
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Col>
              <Col>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    dispatch(createAction(SET_SELECTED_DEPARTMENT)('fire'))
                    NavigationService.navigate('UserRequest')
                  }}>
                  <LinearGradient
                    style={{
                      flex: 1,
                      marginLeft: 4,
                      borderRadius: 8,
                      padding: 8,
                      justifyContent: 'flex-end'
                    }}
                    colors={['#8A2387', '#E94057', '#f27121']}
                    start={[0, 1]}
                    end={[1, 0]}>
                    <Text
                      style={{
                        color: '#f6f1ee',
                        fontWeight: 'bold',
                        textTransform: 'lowercase',
                        fontSize: 24
                      }}>
                      Fire
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Col>
            </Row>
            <Row>
              <Col>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    NavigationService.navigate('UserRequest')
                    dispatch(createAction(SET_SELECTED_DEPARTMENT)('police'))
                  }}>
                  <LinearGradient
                    style={{
                      flex: 1,
                      marginRight: 4,
                      borderRadius: 8,
                      padding: 8,
                      justifyContent: 'flex-end'
                    }}
                    colors={['#1a2a6c', '#b21f1f', '#fdbb2d']}
                    start={[0, 1]}
                    end={[1, 0]}>
                    <Text
                      style={{
                        color: '#f6f1ee',
                        fontWeight: 'bold',
                        textTransform: 'lowercase',
                        fontSize: 24
                      }}>
                      Police
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Col>
              <Col>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() =>
                    NavigationService.navigate('UserVerification')
                  }>
                  <LinearGradient
                    style={{
                      flex: 1,
                      marginLeft: 4,
                      borderRadius: 8,
                      padding: 8,
                      justifyContent: 'flex-end'
                    }}
                    colors={['#ffa6b7', '#1e2ad2']}
                    start={[0, 1]}
                    end={[1, 0]}>
                    <Text
                      style={{
                        color: '#f6f1ee',
                        fontWeight: 'bold',
                        textTransform: 'lowercase',
                        fontSize: 24
                      }}>
                      Typhoon
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
      <Footer active='home' />
    </Container>
  )
}

export default UserHome
