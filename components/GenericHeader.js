import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Button, Header, Left, Body, Right, Title } from 'native-base'

const GenericHeader = props => {
  return (
    <Header style={{ elevation: 0 }}>
      <Left>
        <Button transparent>
          <Icon name='menu' />
        </Button>
      </Left>
      <Body>
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

GenericHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default GenericHeader
