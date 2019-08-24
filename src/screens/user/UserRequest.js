import React, { Fragment, useState } from 'react'
import { Container, Content, Form, Button, Text } from 'native-base'
import { Formik } from 'formik'

import GenericInput from '../../components/GenericInput'
import GenericHeader from '../../components/GenericHeader'
import GenericPicker from '../../components/GenericPicker'
import GenericTextarea from '../../components/GenericTextarea'
import Spacer from '../../components/Spacer'

const UserRequest = () => {
  const [isMoreFields, setMoreFields] = useState(false)
  return (
    <Container>
      <GenericHeader title='Emergency Request' type='back' />
      <Content padder>
        <Formik initialValues={{}} onSubmit={values => {}}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValidating,
            setFieldValue
          }) => (
            <Form>
              <GenericPicker
                label='How urgent is your emergency?'
                name='urgency'
                placeholder='Select urgency'
                items={['Low', 'Medium', 'High', 'Critical']}
                handleChange={handleChange}
                value={values.role}
              />
              <GenericPicker
                label='What is your role?'
                name='role'
                placeholder='Select role'
                items={['I need help!', 'I am requesting for someone else!']}
                handleChange={handleChange}
                value={values.role}
              />

              {isMoreFields && (
                <Fragment>
                  {/* change to textarea TODO: make generictextarea */}
                  <GenericTextarea
                    label='Emergency Description'
                    name='description'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.description}
                    placeholder='Describe your emergency'
                    error={errors.description && touched.description}
                    errorMessage={errors.description}
                  />
                  <GenericTextarea
                    label='Address'
                    name='address'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.address}
                    placeholder='e.g. - Lopez Jaena St., Jaro, Iloilo Ctiy'
                    error={errors.address && touched.address}
                    errorMessage={errors.address}
                  />
                  <GenericTextarea
                    label='Additional Comments'
                    name='comments'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.comments}
                    placeholder='Add more to the description'
                    error={errors.comments && touched.comments}
                    errorMessage={errors.comments}
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
              <Button block>
                <Text>Submit Request</Text>
              </Button>
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  )
}

export default UserRequest
