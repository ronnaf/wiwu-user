import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Platform } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Icon, Button, Header, Left, Body, Right, Title } from 'native-base'

/**
 * generic header
 *
 * @property {object} navigation already given by withNavigator wrapper
 * @property {string} title title of the header
 * @property {string} type could be ['drawer', 'back'] for now
 *
 * example
 * ```js
 * <GenericHeader title='Contact Directory' type='drawer' />
 * ```
 */
const GenericHeader = props => {
  const { navigation, title, type, SegmentComponent, ...rest } = props

  let nav
  switch (type) {
    case 'drawer':
      nav = { icon: 'menu', action: () => navigation.openDrawer() }
      break
    case 'back':
      nav = { icon: 'arrow-back', action: () => navigation.goBack() }
      break
    default:
      nav = {}
      break
  }

  return (
    <Header style={{ elevation: 0 }} {...rest}>
      <Left>
        <Button transparent onPress={nav.action}>
          <Icon name={nav.icon} />
        </Button>
      </Left>
      <Body style={SegmentComponent ? {} : styles.body}>
        {SegmentComponent ? <SegmentComponent /> : <Title>{title}</Title>}
      </Body>
      <Right>
        <Button transparent>
          <Icon name='contact' />
        </Button>
      </Right>
    </Header>
  )
}

const styles = StyleSheet.create({
  body: {
    ...Platform.select({
      ios: {
        flex: 3
      },
      android: {
        flex: 1
      }
    })
  }
})

GenericHeader.propTypes = {
  title: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  SegmentComponent: PropTypes.element
}

export default withNavigation(GenericHeader)
