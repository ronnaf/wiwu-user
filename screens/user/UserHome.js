import React from 'react'
import {
  Container,
  Text,
  Icon,
  Footer,
  FooterTab,
  Button,
  Header,
  Left,
  Body,
  Right
} from 'native-base'
import { View, Dimensions, TouchableOpacity } from 'react-native'
import { Grid, Row, Col } from 'react-native-easy-grid'
import { LinearGradient } from 'expo-linear-gradient'
import Spacer from '../../components/Spacer'
import commonColor from '../../native-base-theme/variables/commonColor'

const { contentPadding } = commonColor
const { width } = Dimensions.get('window')
const outerCircle = width - 32
const middleCircle = outerCircle - 80
const innerCircle = middleCircle - 80

const UserHome = () => {
  return (
    <Container style={{ backgroundColor: '#f6f1ee' }}>
      <Header>
        <Left>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body />
        <Right>
          <Button transparent>
            <Icon name='contact' />
          </Button>
        </Right>
      </Header>
      <Grid style={{ margin: contentPadding }}>
        <Row size={3.5} style={{ alignItems: 'flex-end' }}>
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
          </Col>
        </Row>
        <Row size={1.25}>
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
            <Row>
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
      <Footer>
        <FooterTab>
          <Button active>
            <Icon name='home' />
          </Button>
          <Button>
            <Icon name='notifications' />
          </Button>
          <Button>
            <Icon name='map' />
          </Button>
          <Button>
            <Icon name='contacts' />
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  )
}

export default UserHome
