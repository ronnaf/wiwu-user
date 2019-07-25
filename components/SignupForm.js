import React from 'react'
import { Formik } from 'formik'
import { View } from 'react-native'
import { Input, Button, Card, Form, Item as FormItem, Text } from 'native-base'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { signup } from '../actions/user/userSignup.actions'
import { registrationSchema } from '../constants/Schemas.js'

const ValidationText = styled.Text`
  color: red;
  text-align: center;
`
const RegistrationCard = styled(Card)`
  border: 10px solid black;
  padding: 10px;
  margin: 10px;
`
const FormInput = styled(Input)`
  text-align: center;
  margin: 10px;
`
export const SignupForm = () => {
  const dispatch = useDispatch()
  return (
    <RegistrationCard>
      <Formik
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          phoneNumber: ''
        }}
        validationSchema={registrationSchema}
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
          <View>
            <Form>
              <FormItem
                success={!errors.firstName && touched.firstName}
                error={errors.firstName && touched.firstName}>
                <FormInput
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  placeholder='First Name'
                  floating
                />
              </FormItem>
              {errors.firstName && touched.firstName ? (
                <ValidationText>{errors.firstName}</ValidationText>
              ) : null}
              <FormItem
                success={!errors.lastName && touched.lastName}
                error={errors.lastName && touched.lastName}>
                <FormInput
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  placeholder='Last Name'
                  floating
                />
              </FormItem>
              {errors.lastName && touched.lastName ? (
                <ValidationText>{errors.lastName}</ValidationText>
              ) : null}
              <FormItem
                success={!errors.email && touched.email}
                error={errors.email && touched.email}>
                <FormInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder='Email'
                  floating
                />
              </FormItem>
              {errors.email && touched.email ? (
                <ValidationText>{errors.email}</ValidationText>
              ) : null}
              <FormItem
                success={!errors.password && touched.password}
                error={errors.password && touched.password}>
                <FormInput
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                  placeholder='Password'
                  floating
                />
              </FormItem>
              {errors.password && touched.password ? (
                <ValidationText>{errors.password}</ValidationText>
              ) : null}
              <FormItem
                success={!errors.phoneNumber && touched.phoneNumber}
                error={errors.phoneNumber && touched.phoneNumber}>
                <FormInput
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                  placeholder='Phone Number'
                  floating
                />
              </FormItem>
              {errors.phoneNumber && touched.phoneNumber ? (
                <ValidationText>{errors.phoneNumber}</ValidationText>
              ) : null}
              <Button
                onPress={handleSubmit}
                title='Submit'
                disabled={isSubmitting || isValidating}
                rounded
                full>
                <Text>Submit</Text>
              </Button>
            </Form>
          </View>
        )}
      </Formik>
    </RegistrationCard>
  )
}
