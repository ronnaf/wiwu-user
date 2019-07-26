import React from 'react'
import { Constants } from 'expo'
import { Formik } from 'formik'
import { changePassword } from '../actions/user/changePassword.action'
import { useDispatch } from 'react-redux'
import {
  Container,
  Header,
  Button,
  Text,
  Body,
  Form,
  Item as FormItem,
  Input,
  Label,
  Title
} from 'native-base'

const PasswordResetScreen = props => {
  const dispatch = useDispatch()
  return (
    <Container style={{ paddingTop: Constants.statusBarHeight }}>
      <Formik
        initialValues={{ username: '' }}
        onSubmit={({ username }, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false)
          }, 400)
          dispatch(changePassword(username))
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
