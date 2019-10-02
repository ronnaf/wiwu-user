import React, { useEffect, createRef } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert'

const Banner = props => {
  const { type, title, description } = props
  const alertRef = createRef()

  useEffect(() => {
    alertRef.current.alertWithType(type, title, description)
  })

  return (
    <View>
      <DropdownAlert ref={alertRef} />
    </View>
  )
}

Banner.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default Banner
