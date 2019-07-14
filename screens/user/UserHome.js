import React from 'react'
import { Container, Text, Icon } from 'native-base'
import { SafeAreaView, View, Dimensions, TouchableOpacity } from 'react-native'
import { Grid, Row, Col } from 'react-native-easy-grid'
import { LinearGradient } from 'expo-linear-gradient'
import Spacer from '../../components/Spacer'

const { width } = Dimensions.get('window')
const outerCircle = width - 32
const middleCircle = outerCircle - 80
const innerCircle = middleCircle - 80

const UserHome = () => {
  return (
    <Container style={{ backgroundColor: '#f6f1ee' }}>
      <SafeAreaView style={{ flex: 1, margin: 16 }}>
        <Grid>
          <Row style={{ height: 56 }}>
            <Col>
              <TouchableOpacity>
                <Icon name='menu' style={{ color: '#6F706F' }} />
              </TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity>
                <Icon
                  name='contact'
                  style={{ color: '#6F706F', alignSelf: 'flex-end' }}
                />
              </TouchableOpacity>
            </Col>
          </Row>
          <Row size={5} style={{ justifyContent: 'flex-end' }}>
            <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View
                style={{
                  height: outerCircle,
                  width: outerCircle,
                  borderRadius: outerCircle / 2,
                  backgroundColor: '#f6ece8',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <View
                  style={{
                    height: middleCircle,
                    width: middleCircle,
                    borderRadius: middleCircle / 2,
                    backgroundColor: '#f5e3e1',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <TouchableOpacity
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
                </View>
              </View>
              <Spacer height={40} />
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
              <Spacer height={40} />
            </Col>
          </Row>
          <Row size={1.5}>
            <Col>
              <Row style={{ marginBottom: 8 }}>
                <Col>
                  <TouchableOpacity style={{ flex: 1 }}>
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
                  <TouchableOpacity style={{ flex: 1 }}>
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
              <Row style={{ marginBottom: 8 }}>
                <Col>
                  <TouchableOpacity style={{ flex: 1 }}>
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
                  <TouchableOpacity style={{ flex: 1 }}>
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
      </SafeAreaView>
    </Container>
  )
}

export default UserHome
