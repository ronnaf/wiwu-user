import React from 'react'
import Constants from 'expo-constants'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import {
  Container,
  Button,
  Text,
  Form,
  Item as FormItem,
  Input,
  Label
} from 'native-base'

import { changePassword } from '../actions/user/changePassword.action'

const PasswordResetScreen = props => {
  const dispatch = useDispatch()
  return (
    <Container style={{ paddingTop: Constants.statusBarHeight }}>
      <Formik
        initialValues={{ username: '' }}
        onSubmit={({ username }, { setSubmitting }) => {
          dispatch(changePassword(username))
          setSubmitting(false)
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setFieldTouched
        }) => (
          <Container>
            <Form>
              <FormItem floatingLabel>
                <Label>Email</Label>
                <Input
                  name='username'
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  autoCapitalize='none'
                  value={values.username}
                />
              </FormItem>
              <Button
                onPress={handleSubmit}
                full
                primary
                style={{ paddingBottom: 4 }}>
                <Text> Send </Text>
              </Button>
            </Form>
          </Container>
        )}
      </Formik>
    </Container>
  )
}

export default PasswordResetScreen
