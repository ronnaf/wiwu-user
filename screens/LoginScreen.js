/**
 * NOT IN USE
 */
import React from 'react'
import Constants from 'expo-constants'
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
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/user/userLogin.actions'

const LoginScreen = props => {
  const dispatch = useDispatch()
  const current = useSelector(state => state.user.current)
  console.log(current)
  return (
    <Container style={{ paddingTop: Constants.statusBarHeight }}>
      <Header>
        <Body>
          <Title>Wee Woo</Title>
        </Body>
      </Header>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false)
          }, 400)
          dispatch(login(values.username, values.password))
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
              <FormItem floatingLabel last>
                <Label>Password</Label>
                <Input
                  name='password'
                  type='password'
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  autoCapitalize='none'
                  secureTextEntry={true}
                />
              </FormItem>

              <Button
                onPress={handleSubmit}
                full
                primary
                style={{ paddingBottom: 4 }}>
                <Text> Login </Text>
              </Button>
            </Form>
          </Container>
        )}
      </Formik>
    </Container>
  )
}

export default LoginScreen
