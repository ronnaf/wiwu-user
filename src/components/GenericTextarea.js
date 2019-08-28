/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import { StyleSheet } from 'react-native'
import { Label, Item as FormItem, Icon, Text, Textarea } from 'native-base'

import Spacer from './Spacer'

const GenericTextarea = ({
  label,
  name,
  placeholder,
  handleChange,
  handleBlur,
  value,
  error,
  errorMessage,
  ...rest
}) => {
  return (
    <Fragment>
      {label && <Label style={styles.label}>{label}</Label>}
      <FormItem regular error={error}>
        {/* TODO: add onChange handler */}
        <Textarea
          rowSpan={5}
          placeholder={placeholder}
          onChangeText={e => handleChange(e)}
        />
        {error && <Icon name='close-circle' />}
      </FormItem>
      {error && <Text style={styles.error}>{errorMessage}</Text>}
      <Spacer height={16} />
    </Fragment>
  )
}

const styles = StyleSheet.create({
  label: { fontSize: 15, marginBottom: 5 },
  error: { color: '#DB423A', fontSize: 13, marginTop: 5 }
})

// TODO: add proptypes, remove eslint exception sa babaw
GenericTextarea.propTypes = {}

export default GenericTextarea
