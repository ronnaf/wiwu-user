import React from 'react'
import { Icon, Button, Header, Left, Body, Right, Title } from 'native-base'

import NavigationService from '../navigation/NavigationService'

const GenericHeader = props => {
  return (
    <Header>
      <Left>
        <Button transparent>
          {props.title === 'Settings' && (
            <Icon
              name='arrow-back'
              onPress={() => NavigationService.navigate('Home')}
            />
          )}
          {props.title !== 'Settings' && <Icon name='menu' />}
        </Button>
      </Left>
      <Body style={{ flex: 3 }}>
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

export default GenericHeader
