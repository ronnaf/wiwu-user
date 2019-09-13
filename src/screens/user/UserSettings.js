import React, { useEffect } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { Text, Form, Button, Container, Content } from 'native-base'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { createAction } from 'redux-actions'
import * as ImagePicker from 'expo-image-picker'
import _ from 'lodash'

import {
  EDIT_PIN_COORDINATES,
  EDIT_REGION_COORDINATES
} from '../../actions/map/map.constants'
import { logout } from '../../actions/user/logout.action'
import { editUser } from '../../actions/user/editUser.actions'
import { EditSchema } from '../../constants/Schemas'
import { images } from '../../assets/assets'
import { showCameraActionSheet } from '../../helpers/camera.helper'

import Map from '../../components/Map'
import GenericHeader from '../../components/GenericHeader'
import GenericInput from '../../components/GenericInput'
import Spacer from '../../components/Spacer'
import GenericField from '../../components/GenericField'

const UserSettings = props => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.current)
  const isOffline = useSelector(state => state.user.netInfo.isOffline)

  const { firstName, lastName, phoneNumber, email, avatar } = user
  console.log('[!] UserSettings - avatar -', avatar)

  useEffect(() => {
    dispatch(createAction(EDIT_PIN_COORDINATES)(user.homeCoordinates))
    dispatch(createAction(EDIT_REGION_COORDINATES)(user.homeCoordinates))
  }, [])

  return (
    <Container>
      <GenericHeader title='Settings' type='back' />
      <Content padder>
        <Formik
          initialValues={{
            email,
            firstName,
            lastName,
            phoneNumber,
            avatar
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
                        !_.isEmpty(values.avatar)
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
                  name='email'
                  label='Email'
                  placeholder='e.g. - juan.delacruz@gmail.com'
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.email}
                  disabled={true}
                  error={!!errors.email}
                  errorMessage={errors.email}
                />
                <GenericInput
                  name='firstName'
                  label='First Name'
                  placeholder='e.g. - Juan'
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.firstName}
                  error={!!errors.firstName}
                  errorMessage={errors.firstName}
                />
                <GenericInput
                  name='lastName'
                  label='Last Name'
                  placeholder='e.g. - dela Cruz'
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.lastName}
                  error={!!errors.lastName}
                  errorMessage={errors.lastName}
                />
                {/* Maybe add data formatting for numbers like 0917-7456-123 */}
                <GenericInput
                  name='phoneNumber'
                  label='Phone Number'
                  placeholder='e.g. - 09123456789'
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.phoneNumber}
                  error={!!errors.phoneNumber}
                  errorMessage={errors.phoneNumber}
                />

                <GenericField
                  label={'Home Location'}
                  CustomComponent={
                    <View style={{ height: 400 }}>
                      <Map isUserSettings={true} />
                    </View>
                  }
                />

                <Spacer height={48} />
                <Button
                  onPress={handleSubmit}
                  disabled={isOffline}
                  block
                  primary>
                  <Text>Update Profile</Text>
                </Button>

                <Spacer height={8} />
                <Button
                  onPress={() => dispatch(logout())}
                  full
                  transparent
                  danger
                  disabled={isSubmitting || isOffline}>
                  <Text>Log out from this device</Text>
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
