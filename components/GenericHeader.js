import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Button, Header, Left, Body, Right, Title } from 'native-base'

import NavigationService from '../navigation/NavigationService'

const GenericHeader = props => {
  return (
    <Header style={{ elevation: 0 }}>
      <Left>
        <Button transparent>
          {props.title === 'Settings' && (
            <Icon
              name='arrow-back'
              onPress={() => NavigationService.navigate('UserHome')}
            />
          )}
          {props.title !== 'Settings' && <Icon name='menu' />}
        </Button>
      </Left>
      <Body>
        <Title>{props.title}</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon
            name='settings'
            onPress={() => NavigationService.navigate('UserSettings')}
          />
        </Button>
      </Right>
    </Header>
  )
}

GenericHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default GenericHeader
