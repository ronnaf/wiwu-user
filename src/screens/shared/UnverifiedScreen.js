import React from 'react'
import { Image } from 'react-native'
import { Text, Button, Title, Container, Header, View } from 'native-base'
import { Grid, Row, Col } from 'react-native-easy-grid'
import { useSelector, useDispatch } from 'react-redux'

import { verifyUser } from '../../actions/user/verifyUser.action'
import { auth } from '../../firebase'

import Spacer from '../../components/Spacer'

const UnverifiedScreen = props => {
  const isOffline = useSelector(state => state.user.netInfo.isOffline)
  const email = useSelector(state => state.user.current.email)
  const dispatch = useDispatch()

  return (
    <Container>
      <Header />
      <Grid>
        <Row
          size={1}
          style={{
            alignItems: 'flex-end'
          }}>
          <Col
            style={{
              alignItems: 'center'
            }}>
            <View padder>
              <Image
                source={require('../../assets/images/paper-plane.png')}
                style={{ height: 50, width: 50 }}
              />
            </View>
          </Col>
        </Row>
        <Row size={4}>
          <Col>
            <View padder>
              <Spacer height={16} />
              <Title>VERIFY EMAIL ADDRESS</Title>
              <Spacer height={24} />
              <Text style={{ textAlign: 'center' }}>
                A confirmation email has been sent to
              </Text>
              <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                {email}
              </Text>
              <Spacer height={16} />
              <Text note style={{ textAlign: 'center' }}>
                Click on the link in the email to verify your account.
              </Text>
            </View>
          </Col>
        </Row>
        <Row size={2}>
          <Col>
            <View padder>
              <Button
                primary
                block
                disabled={isOffline}
                onPress={() => dispatch(verifyUser)}>
                <Text>I have already done this</Text>
              </Button>
              <Spacer height={8} />
              <Button
                full
                transparent
                disabled={isOffline}
                onPress={() => auth.currentUser.sendEmailVerification()}>
                <Text>Resend Verification Email</Text>
              </Button>
            </View>
          </Col>
        </Row>
      </Grid>
    </Container>
  )
}

export default UnverifiedScreen
