import React, { Fragment } from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Label, Item as FormItem, Input, Icon, Text } from 'native-base'

import Spacer from './Spacer'

/**
 * Custom input component to be used instead of creating Form, Item and Input repeatedly.
 * @author [Ronna Mae Firmo](https://github.com/ronnamaeffirmo)
 *
 * Example Usage:
 * ```js
 * <GenericInput
 *  label='First Name'
 *  name='firstName'
 *  handleChange={handleChange}
 *  handleBlur={handleBlur}
 *  value={values.firstName}
 *  placeholder='e.g. - John'
 *  error={errors.firstName && touched.firstName}
 *  errorMessage={errors.firstName} />
 * ```
 */
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
  label: { fontSize: 15, marginBottom: 5 },
  error: { color: '#DB423A', fontSize: 13, marginTop: 5 }
})

GenericInput.propTypes = {
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
   * handleBlur function from formik (required)
   */
  handleBlur: PropTypes.func.isRequired,

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
  errorMessage: PropTypes.string
}

export default GenericInput
