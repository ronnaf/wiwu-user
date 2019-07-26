import React from 'react'
import {
  Container,
  Button,
  Text,
  Form,
  Item as FormItem,
  Input,
  Footer
} from 'native-base'
import { Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { loginUser } from '../../actions/user/loginUser.action'
import { images } from '../../assets/index'
import Spacer from '../../components/Spacer'
import commonColor from '../../native-base-theme/variables/commonColor'

const { contentPadding } = commonColor

const LoginScreen = props => {
  const dispatch = useDispatch()
  const current = useSelector(state => state.user.current)
  console.log('[!] LoginScreen - current -', current)

  return (
    <Container style={{ padding: contentPadding, backgroundColor: '#f6f1ee' }}>
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
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false)
                }, 400)
                dispatch(loginUser(values.username, values.password))
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
                <Form>
                  <FormItem regular>
                    <Input
                      name='username'
                      placeholder='Email'
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      autoCapitalize='none'
                      value={values.username}
                    />
                  </FormItem>
                  <Spacer height={8} />
                  <FormItem regular>
                    <Input
                      name='password'
                      type='password'
                      placeholder='Password'
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      autoCapitalize='none'
                      secureTextEntry={true}
                    />
                  </FormItem>
                  <Spacer height={48} />
                  <Button onPress={handleSubmit} full primary>
                    <Text>Login</Text>
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
        <Row size={1}></Row>
      </Grid>
    </Container>
  )
}

export default LoginScreen
