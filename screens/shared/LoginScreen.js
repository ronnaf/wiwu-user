import React, { useEffect } from 'react'
import { Container, Button, Text, Form } from 'native-base'
import { Image } from 'react-native'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import { Col, Row, Grid } from 'react-native-easy-grid'
import * as Yup from 'yup'

import { loginUser, checkToken } from '../../actions/user/loginUser.action'

import { images } from '../../assets/index'
import NavigationService from '../../navigation/NavigationService'
import Spacer from '../../components/Spacer'
import commonColor from '../../native-base-theme/variables/commonColor'
import GenericInput from '../../components/GenericInput'

const { contentPadding } = commonColor

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required')
})

const LoginScreen = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    checkToken(dispatch)
  }, [])

  return (
    <Container style={{ padding: contentPadding }}>
      <Grid>
        <Row size={2.5}>
          <Col style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
            <Image
              source={images.logo}
              resizeMode='contain'
              style={{ height: 200, width: 200 }}
            />
          </Col>
        </Row>
        <Row size={3}>
          <Col>
            <Spacer height={24} />
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={(values, { setSubmitting }) => {
                dispatch(loginUser(values.username, values.password))
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
              }) => {
                console.log(errors)
                return (
                  <Form>
                    <GenericInput
                      name='username'
                      placeholder='Email'
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.username}
                      error={!!errors.username}
                      errorMessage={errors.username}
                    />
                    <GenericInput
                      name='password'
                      placeholder='Password'
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.password}
                      secureTextEntry={true}
                      error={!!errors.password}
                      errorMessage={errors.password}
                    />
                    <Spacer height={48} />
                    <Button onPress={handleSubmit} full primary>
                      <Text>Login</Text>
                    </Button>
                    <Spacer height={16} />
                    <Button
                      onPress={() => NavigationService.navigate('Signup')}
                      full
                      transparent
                      small>
                      <Text>Register instead</Text>
                    </Button>
                  </Form>
                )
              }}
            </Formik>
          </Col>
        </Row>
        <Row size={1}></Row>
      </Grid>
    </Container>
  )
}

export default LoginScreen
