import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'native-base'

const Spacer = ({ height }) => <View height={height} />

Spacer.propTypes = {
  height: PropTypes.number
}

export default Spacer
