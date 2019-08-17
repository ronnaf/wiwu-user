import React from 'react'
import { Icon, Button, Header, Left, Body, Right, Title } from 'native-base'

const GenericHeader = props => {
  return (
    <Header>
      <Left>
        <Button transparent>
          <Icon name='menu' onPress={() => props.openDrawer()} />
        </Button>
      </Left>
      <Body style={{ flex: 3 }}>
        <Title>{props.title}</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon name='contact' />
        </Button>
      </Right>
    </Header>
  )
}

export default GenericHeader
