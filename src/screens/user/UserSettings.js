import React, { useEffect } from 'react'
import { View, Image } from 'react-native'
import { Text, Form, Button, Container, Content } from 'native-base'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { createAction } from 'redux-actions'

import { EDIT_COORDINATES } from '../../actions/map/map.constants'
import { logout } from '../../actions/user/logout.action'
import { editUser } from '../../actions/user/editUser.actions'
import { EditSchema } from '../../constants/Schemas'

import Map from '../../components/Map'
import GenericHeader from '../../components/GenericHeader'
import GenericInput from '../../components/GenericInput'
import Spacer from '../../components/Spacer'
import GenericUser from '../../assets/images/generic-user.png'

const UserSettings = props => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.current)
  const isOffline = useSelector(state => state.user.netInfo.type === 'none')

  const { firstName, lastName, phoneNumber, email } = user

  useEffect(() => {
    dispatch(createAction(EDIT_COORDINATES)(user.homeCoordinates))
  }, [])

  return (
    <Container>
      <GenericHeader title='Settings' type='back' />
      <Content padder>
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
            email,
            firstName,
            lastName,
            phoneNumber
          }}
          validationSchema={EditSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(editUser(values))
            setSubmitting(false)
          }}>
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => {
            return (
              <Form>
                <GenericInput
                  name='email'
                  placeholder='Email'
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.email}
                  disabled={true}
                  error={!!errors.email}
                  errorMessage={errors.email}
                />
                <GenericInput
                  name='firstName'
                  placeholder='Firstname'
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.firstName}
                  error={!!errors.firstName}
                  errorMessage={errors.firstName}
                />
                <GenericInput
                  name='lastName'
                  placeholder='Lastname'
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.lastName}
                  error={!!errors.lastName}
                  errorMessage={errors.lastName}
                />
                <GenericInput
                  name='phoneNumber'
                  placeholder='Phone'
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.phoneNumber}
                  error={!!errors.phoneNumber}
                  errorMessage={errors.phoneNumber}
                />

                <View style={{ height: 400 }}>
                  <Map isUserSettings={true} />
                </View>

                <Button
                  onPress={handleSubmit}
                  disabled={isOffline}
                  full
                  primary>
                  <Text>Submit</Text>
                </Button>

                <Spacer height={4} />

                <Button
                  onPress={() => dispatch(logout())}
                  full
                  danger
                  disabled={isSubmitting || isOffline}>
                  <Text>Logout</Text>
                </Button>
              </Form>
            )
          }}
        </Formik>
      </Content>
    </Container>
  )
}

export default UserSettings
