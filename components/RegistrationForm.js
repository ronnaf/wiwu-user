import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { View, Text } from 'react-native'
import { Input, Button, Card, Item } from 'native-base'
import styled from 'styled-components'
import { auth, firestore } from '../firebase'
import { statuses, roles } from '../constants/User'

const registerUser = async values => {
  try {
    await auth.createUserWithEmailAndPassword(values.email, values.password)
    const uid = await auth.currentUser.uid
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      emergencies: [],
      role: roles.USER,
      status: statuses.ACTIVE
    }
    await firestore
      .collection('users')
      .doc(uid)
      .set(data)
    // redirect to next screen
  } catch (e) {
    // handle error (toast)
    console.log(e)
  }
}

const RegistrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid Email')
    .required('Required'),
  password: Yup.string()
    .test(
      'isStrong',
      `Password must contain a lowercase letter, an uppercase letter, a number and one of the following characters: !@#$&*`,
      value => {
        const regex = new RegExp(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*]).{8,}$'
        )
        return regex.test(value)
      }
    )
    .min(8, 'Too Short!')
    .required('Required!'),
  phoneNumber: Yup.number()
    .test('isPhoneNumber', 'Must be a valid 10 digit phone number!', value => {
      const regex = new RegExp('^(?=.*[0-9]{10}$)')
      return regex.test(value)
    })
    .required('Required')
})

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
export const RegistrationForm = () => (
  <RegistrationCard>
    <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        phoneNumber: ''
      }}
      validationSchema={RegistrationSchema}
      onSubmit={values => registerUser(values)}>
      {props => (
        <View>
          <Item
            success={!props.errors.firstName && props.touched.firstName}
            error={props.errors.firstName && props.touched.firstName}>
            <FormInput
              onChangeText={props.handleChange('firstName')}
              onBlur={props.handleBlur('firstName')}
              value={props.values.firstName}
              placeholder='First Name'
              floating
            />
          </Item>
          {props.errors.firstName && props.touched.firstName ? (
            <ValidationText>{props.errors.firstName}</ValidationText>
          ) : null}
          <Item
            success={!props.errors.lastName && props.touched.lastName}
            error={props.errors.lastName && props.touched.lastName}>
            <FormInput
              onChangeText={props.handleChange('lastName')}
              onBlur={props.handleBlur('lastName')}
              value={props.values.lastName}
              placeholder='Last Name'
              floating
            />
          </Item>
          {props.errors.lastName && props.touched.lastName ? (
            <ValidationText>{props.errors.lastName}</ValidationText>
          ) : null}
          <Item
            success={!props.errors.email && props.touched.email}
            error={props.errors.email && props.touched.email}>
            <FormInput
              onChangeText={props.handleChange('email')}
              onBlur={props.handleBlur('email')}
              value={props.values.email}
              placeholder='Email'
              floating
            />
          </Item>
          {props.errors.email && props.touched.email ? (
            <ValidationText>{props.errors.email}</ValidationText>
          ) : null}
          <Item
            success={!props.errors.password && props.touched.password}
            error={props.errors.password && props.touched.password}>
            <FormInput
              onChangeText={props.handleChange('password')}
              onBlur={props.handleBlur('password')}
              value={props.values.password}
              placeholder='Password'
              secureTextEntry
              floating
            />
          </Item>
          {props.errors.password && props.touched.password ? (
            <ValidationText>{props.errors.password}</ValidationText>
          ) : null}
          <Item
            success={!props.errors.phoneNumber && props.touched.phoneNumber}
            error={props.errors.phoneNumber && props.touched.phoneNumber}>
            <FormInput
              onChangeText={props.handleChange('phoneNumber')}
              onBlur={props.handleBlur('phoneNumber')}
              value={props.values.phoneNumber}
              placeholder='Phone Number'
              floating
            />
          </Item>
          {props.errors.phoneNumber && props.touched.phoneNumber ? (
            <ValidationText>{props.errors.phoneNumber}</ValidationText>
          ) : null}
          <Button
            onPress={props.handleSubmit}
            title='Submit'
            disabled={props.isSubmitting || props.isValidating}
            rounded
            full>
            <Text>Submit</Text>
          </Button>
        </View>
      )}
    </Formik>
  </RegistrationCard>
)
