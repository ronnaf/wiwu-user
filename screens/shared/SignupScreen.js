import React from 'react'
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Content,
  Form,
  Text
} from 'native-base'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { signupSchema } from '../../constants/Schemas'
import { signup } from '../../actions/user/userSignup.actions'
import GenericInput from '../../components/GenericInput'
import Spacer from '../../components/Spacer'
import NavigationService from '../../navigation/NavigationService'

const SignupScreen = () => {
  const dispatch = useDispatch()
  return (
    <Container>
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => NavigationService.navigate('Login')}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Registration</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        <Formik
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            phoneNumber: ''
          }}
          validationSchema={signupSchema}
          onSubmit={values => {
            dispatch(
              signup(
                values.email,
                values.password,
                values.firstName,
                values.lastName,
                values.phoneNumber
              )
            )
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValidating
          }) => (
            <Form>
              <GenericInput
                label='First Name'
                name='firstName'
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.firstName}
                placeholder='e.g. - John'
                error={errors.firstName && touched.firstName}
                errorMessage={errors.firstName}
              />
              <GenericInput
                label='Last Name'
                name='lastName'
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.lastName}
                placeholder='e.g. - Doe'
                error={errors.lastName && touched.lastName}
                errorMessage={errors.lastName}
              />
              <GenericInput
                label='Email'
                name='email'
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.email}
                placeholder='e.g. - johndoe@gmail.com'
                error={errors.email && touched.email}
                errorMessage={errors.email}
              />
              <GenericInput
                label='Password'
                name='password'
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.password}
                placeholder='e.g. - *********'
                error={errors.password && touched.password}
                errorMessage={errors.password}
                secureTextEntry={true}
              />
              <GenericInput
                label='Phone Number'
                name='phoneNumber'
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.phoneNumber}
                placeholder='e.g. - +639123456789'
                error={errors.phoneNumber && touched.phoneNumber}
                errorMessage={errors.phoneNumber}
              />
              <Spacer height={48} />
              <Button
                onPress={handleSubmit}
                disabled={isSubmitting || isValidating}
                full>
                <Text>Submit</Text>
              </Button>
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  )
}

export default SignupScreen
