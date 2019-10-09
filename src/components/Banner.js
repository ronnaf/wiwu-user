import React, { useEffect, createRef } from 'react'
import PropTypes from 'prop-types'
import DropdownAlert from 'react-native-dropdownalert'

const Banner = props => {
  const { type, title, description } = props
  const alertRef = createRef()

  useEffect(() => {
    alertRef.current.alertWithType(type, title, description)
  })

  return <DropdownAlert ref={alertRef} closeInterval={5000} zIndex={1} />
}

Banner.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default Banner
