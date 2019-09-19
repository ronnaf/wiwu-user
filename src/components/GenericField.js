/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import { StyleSheet } from 'react-native'
import { Label, Text, View } from 'native-base'
import PropTypes from 'prop-types'

import Spacer from './Spacer'

// TODO: add documentation
const GenericField = ({
  label,
  error,
  errorMessage,
  CustomComponent,
  ...rest
}) => {
  return (
    <View>
      {label && <Label style={styles.label}>{label}</Label>}
      {CustomComponent}
      {error && <Text style={styles.error}>{errorMessage}</Text>}
      <Spacer height={16} />
    </View>
  )
}

const styles = StyleSheet.create({
  label: { fontSize: 15, marginBottom: 5 },
  error: { color: '#DB423A', fontSize: 13, marginTop: 5 }
})

// TODO: add proptypes
GenericField.propTypes = {
  label: PropTypes.string.s,
  CustomComponent: PropTypes.node.isRequired
}

export default GenericField
