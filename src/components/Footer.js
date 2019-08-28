import React from 'react'
import PropTypes from 'prop-types'
import { Footer, FooterTab, Button, Icon } from 'native-base'

import NavigationService from '../navigation/NavigationService'

const UserFooter = ({ active = 'home' }) => {
  return (
    <Footer>
      <FooterTab>
        <Button
          active={active === 'home'}
          onPress={() => NavigationService.navigate('UserHome')}>
          <Icon name='home' />
        </Button>
        <Button active={active === 'notifications'}>
          <Icon name='notifications' />
        </Button>
        <Button
          active={active === 'map'}
          onPress={() => NavigationService.navigate('UserMaps')}>
          <Icon name='map' />
        </Button>
        <Button
          active={active === 'contacts'}
          onPress={() => NavigationService.navigate('UserContactDirectories')}>
          <Icon name='contacts' />
        </Button>
      </FooterTab>
    </Footer>
  )
}

UserFooter.propTypes = {
  active: PropTypes.string.isRequired
}

export default UserFooter
