import React, { Fragment } from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Label, Item as FormItem, Input, Icon, Text } from 'native-base'
import Spacer from './Spacer'

const GenericInput = ({
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
        <Input
          autoCapitalize='none'
          {...rest}
          name={name}
          placeholder={placeholder}
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
          value={value}
        />
        {error && <Icon name='close-circle' />}
      </FormItem>
      {error && <Text style={styles.error}>{errorMessage}</Text>}
      <Spacer height={16} />
    </Fragment>
  )
}

const styles = StyleSheet.create({
  // label: { color: '#575757', fontSize: 15, marginBottom: 5 },
  label: { fontSize: 15, marginBottom: 5 },
  error: { color: '#DB423A', fontSize: 13, marginTop: 5 }
})

GenericInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.string
}

export default GenericInput
