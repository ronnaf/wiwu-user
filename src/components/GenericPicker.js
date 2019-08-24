import React, { Fragment } from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Label, Item as FormItem, Icon, Text, Picker } from 'native-base'
import Spacer from './Spacer'

const GenericPicker = ({
  label,
  name,
  placeholder,
  handleChange,
  value,
  error,
  errorMessage,
  items,
  ...rest
}) => {
  return (
    <Fragment>
      {label && <Label style={styles.label}>{label}</Label>}
      <FormItem regular error={error}>
        <Picker
          {...rest}
          name={name}
          mode='dropdown'
          placeholder={placeholder}
          iosHeader={placeholder}
          iosIcon={<Icon name='arrow-down' />}
          selectedValue={value}
          onValueChange={value => handleChange(value)}>
          {items.map(item => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
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

GenericPicker.propTypes = {
  /**
   * Label of the field (optional)
   *
   */
  label: PropTypes.string,

  /**
   * Name of the field (required)
   */
  name: PropTypes.string.isRequired,

  /**
   * Placeholder of the input, usually an example for the field (optional)
   */
  placeholder: PropTypes.string,

  /**
   * handleChange function from formik (required)
   */
  handleChange: PropTypes.func.isRequired,

  /**
   * Value of the field (required)
   */
  value: PropTypes.any.isRequired,

  /**
   * Whether the field has an error or not
   */
  error: PropTypes.bool,

  /**
   * Error message if an error is thrown by the field
   */
  errorMessage: PropTypes.string,

  items: PropTypes.array.isRequired
}

export default GenericPicker
