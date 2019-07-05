import React from 'react'
import {
  Container,
  Content,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Text,
  Right,
  Title
} from 'native-base'

const PracticeScreen = props => {
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Practice</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        <Text>Hello, world!</Text>
      </Content>
    </Container>
  )
}

export default PracticeScreen

PracticeScreen.navigationOptions = {
  title: 'Practice',
  header: null
}
