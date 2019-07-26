import React from 'react'
import { Constants } from 'expo'
import { Container, Header, Body, Title } from 'native-base'
import { SignupForm } from '../components/SignupForm'

const SignupScreen = () => {
  return (
    <Container style={{ paddingTop: Constants.statusBarHeight }}>
      <Header>
        <Body>
          <Title>Wee Woo</Title>
        </Body>
      </Header>
      <SignupForm />
    </Container>
  )
}

export default SignupScreen
