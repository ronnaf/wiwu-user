import React from 'react'
import {
  Container,
  Header,
  Left,
  Button,
  Body,
  Title,
  Icon,
  Right,
  Content,
  Form,
  Text,
  Textarea
} from 'native-base'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import NavigationService from '../../navigation/NavigationService'
import GenericInput from '../../components/GenericInput'
import Spacer from '../../components/Spacer'

const UserRequestAdd = props => {
  /**
   * NOTE: access form values from previous form ('UserRequest')
   * const values = props.navigation.getParam('values', 'VALUES-NOT-FOUND')
   */
  return (
    <Container>
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => NavigationService.navigate('UserHome')}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Add Information</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        <Formik
          initialValues={{
            address: ''
          }}
          validationSchema={{}}
          onSubmit={values => {}}>
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
              {/** TODO: Additional Fields **/}
              <Textarea
                name='description'
                rowSpan={5}
                bordered
                placeholder='Describe your emergency.'
              />
              <GenericInput
                label='Address'
                name='address'
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.address}
                placeholder='e.g. - Lopez Jaena St., Jaro, Iloilo Ctiy'
                error={errors.address && touched.address}
                errorMessage={errors.address}
              />
              <Textarea
                name='comments'
                rowSpan={5}
                bordered
                placeholder='Additional Comments'
              />
              <Spacer height={48} />
              <Button
                onPress={handleSubmit}
                disabled={isSubmitting || isValidating}
                full
                primary>
                <Text>Submit</Text>
              </Button>
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  )
}

UserRequestAdd.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default UserRequestAdd
