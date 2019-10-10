import React, { Fragment, useState } from 'react'
import { Container, Content, Form, Button, Text } from 'native-base'
import { Formik } from 'formik'
import { View, Image } from 'react-native'
import { Video } from 'expo-av'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import _ from 'lodash'

import { sendRequestAction } from '../../actions/emergency/sendRequest.action'
import { showCameraActionSheet } from '../../helpers/camera.helper'

import GenericHeader from '../../components/GenericHeader'
import GenericPicker from '../../components/GenericPicker'
import GenericInput from '../../components/GenericInput'
import GenericTextarea from '../../components/GenericTextarea'
import GenericField from '../../components/GenericField'
import Spacer from '../../components/Spacer'
import Map from '../../components/Map'

// TODO: ADD CAMERA
const UserRequest = () => {
  const dispatch = useDispatch()

  const [isMoreFields, setMoreFields] = useState(false)
  const department = useSelector(state => state.emergency.departmentSelected)
  const initialValues = {
    department,
    role: 'I need help!',
    description: '',
    address: '',
    media: null
  }

  return (
    <Container>
      <GenericHeader title='Emergency Request' type='back' />
      <Content padder>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={async (values, { resetForm }) => {
            await dispatch(sendRequestAction(values))
            resetForm()
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue
          }) => {
            const ext =
              !_.isEmpty(values.media) &&
              values.media.split('.')[values.media.split('.').length - 1]
            return (
              <Form>
                <GenericInput
                  label='Emergency type'
                  name='department'
                  disabled={true}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={_.upperFirst(values.department)}
                />
                <GenericPicker
                  label='What is your role?'
                  name='role'
                  placeholder='Select role'
                  items={['I need help!', 'I am requesting for someone else!']}
                  handleChange={e => setFieldValue('role', e)}
                  value={values.role}
                />

                <GenericField
                  label={'Emergency location'}
                  CustomComponent={
                    <View style={{ height: 300 }}>
                      <Map />
                    </View>
                  }
                />

                <GenericField
                  label={'Photo/Video'}
                  CustomComponent={
                    <View>
                      {!_.isEmpty(values.media) ? (
                        ext === 'jpg' ? (
                          <View>
                            <Image
                              style={{ height: 300, width: '100%' }}
                              resizeMode='cover'
                              source={{ uri: values.media }}
                            />
                            <Spacer height={8} />
                          </View>
                        ) : (
                          <View>
                            <Video
                              source={{ uri: values.media }}
                              rate={1.0}
                              volume={1.0}
                              isMuted={false}
                              resizeMode={Video.RESIZE_MODE_COVER}
                              shouldPlay={true}
                              isLooping={false}
                              useNativeControls={true}
                              style={{ height: 300, width: '100%' }}
                            />
                            <Spacer height={8} />
                          </View>
                        )
                      ) : (
                        <View />
                      )}
                      <Button
                        primary
                        full
                        bordered
                        onPress={() =>
                          showCameraActionSheet(
                            setFieldValue,
                            'media',
                            'Take Photo/Video',
                            'Choose an Attachment',
                            ImagePicker.MediaTypeOptions.All
                          )
                        }
                        title={'Attach photo or video'}>
                        <Text>
                          {values.media
                            ? 'Update photo or video'
                            : 'Attach photo or video'}
                        </Text>
                      </Button>
                    </View>
                  }
                />

                {isMoreFields && (
                  <Fragment>
                    <GenericTextarea
                      label='Emergency Description'
                      name='description'
                      handleChange={e => setFieldValue('description', e)}
                      handleBlur={handleBlur}
                      value={values.description}
                      placeholder='Describe your emergency'
                      error={errors.description && touched.description}
                      errorMessage={errors.description}
                    />
                    <GenericTextarea
                      label='Address'
                      name='address'
                      handleChange={e => setFieldValue('address', e)}
                      handleBlur={handleBlur}
                      value={values.address}
                      placeholder='e.g. - Lopez Jaena St., Jaro, Iloilo Ctiy'
                      error={errors.address && touched.address}
                      errorMessage={errors.address}
                    />
                  </Fragment>
                )}

                <Button
                  block
                  transparent
                  onPress={() => setMoreFields(!isMoreFields)}>
                  <Text>
                    I want {isMoreFields ? 'less' : 'to add more'} fields
                  </Text>
                </Button>
                <Spacer height={48} />
                <Button block onPress={handleSubmit}>
                  <Text>Submit Request</Text>
                </Button>
              </Form>
            )
          }}
        </Formik>
      </Content>
    </Container>
  )
}

export default UserRequest
