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
  Text,
  View,
  Label
} from 'native-base'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

import { signupSchema } from '../../constants/Schemas'
import { signup } from '../../actions/user/userSignup.actions'
import GenericInput from '../../components/GenericInput'
import Spacer from '../../components/Spacer'
import NavigationService from '../../navigation/NavigationService'
import Map from '../../components/Map'
import GenericField from '../../components/GenericField'
import { Image, TouchableOpacity } from 'react-native'
import { showCameraActionSheet } from '../../helpers/camera.helper'
import * as ImagePicker from 'expo-image-picker'
import { images } from '../../assets/assets'

const SignupScreen = () => {
  const dispatch = useDispatch()
  const isOffline = useSelector(state => state.user.netInfo.isOffline)

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
          onSubmit={(values, { setSubmitting }) => {
            const { email, password, firstName, lastName, phoneNumber } = values

            dispatch(
              signup({
                email,
                password,
                firstName,
                lastName,
                phoneNumber
              })
            )
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
            setFieldValue
          }) => {
            return (
              <Form>
                {/* avatar pic is an exemption to use GenericField */}
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      showCameraActionSheet(
                        setFieldValue,
                        'avatar',
                        'Take Photo',
                        'Select an Avatar',
                        ImagePicker.MediaTypeOptions.Images
                      )
                    }>
                    <Image
                      style={{ height: 200, width: 200, borderRadius: 100 }}
                      resizeMode='cover'
                      source={
                        values.avatar
                          ? { uri: values.avatar }
                          : images.defaultAvatar
                      }
                    />
                  </TouchableOpacity>
                  <Spacer height={8} />
                  <Text note>Tap to change</Text>
                </View>
                <Spacer height={32} />

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

                <GenericField
                  label={'Home location'}
                  CustomComponent={
                    <View style={{ height: 400 }}>
                      <Map />
                    </View>
                  }
                />

                <Spacer height={24} />
                <Button
                  onPress={handleSubmit}
                  disabled={isSubmitting || isOffline}
                  full>
                  <Text>Submit</Text>
                </Button>
              </Form>
            )
          }}
        </Formik>
      </Content>
    </Container>
  )
}

export default SignupScreen
