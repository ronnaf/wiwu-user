import React from 'react'
import { View, Image } from 'react-native'
import { Text, Form, Button } from 'native-base'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'

import { logout } from '../../actions/user/logout.action'
import { EditSchema } from '../../constants/Schemas'

import GenericHeader from '../../components/GenericHeader'
import GenericInput from '../../components/GenericInput'
import Spacer from '../../components/Spacer'
import GenericUser from '../../assets/images/generic-user.png'

const UserSettings = props => {
  const dispatch = useDispatch()

  return (
    <View>
      <GenericHeader title='Settings' />

      <Spacer height={8} />
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Image
          style={{ height: 200, width: 200 }}
          resizeMode='center'
          source={GenericUser}
        />
      </View>
      <Spacer height={8} />

      <Formik
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          phone: ''
        }}
        validate={EditSchema}
        onSubmit={values => console.log(values)}>
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
          console.log(/^(09|\+639)\d{9}$/.test(values.phone), errors)
          return (
            <Form>
              <GenericInput
                name='email'
                placeholder='Email'
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.username}
              />
              <GenericInput
                name='firstName'
                placeholder='Firstname'
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.username}
              />
              <GenericInput
                name='lastName'
                placeholder='Lastname'
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.username}
              />
              <GenericInput
                name='phone'
                placeholder='Phone'
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.username}
              />

              <Button onPress={handleSubmit} full primary>
                <Text>Submit</Text>
              </Button>

              <Spacer height={4} />

              <Button onPress={() => dispatch(logout())} full danger>
                <Text>Logout</Text>
              </Button>
            </Form>
          )
        }}
      </Formik>
    </View>
  )
}

export default UserSettings
