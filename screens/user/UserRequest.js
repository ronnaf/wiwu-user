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
  Text
} from 'native-base'
import { Formik } from 'formik'
// import { useDispatch } from 'react-redux'
import NavigationService from '../../navigation/NavigationService'
import Spacer from '../../components/Spacer'
import PickerItems from '../../components/PickerItems'

// NOTE: Dummy Data
const items = [
  {
    key: 1,
    question: 'How urgent is your emergency?',
    answers: ['Low', 'Medium', 'High', 'Critical']
  },
  {
    key: 2,
    question: 'What is your role?',
    answers: ['I need help!', 'I am requesting for someone else!']
  }
]

const UserRequestScreen = () => {
  // const dispatch = useDispatch()
  return (
    <Container>
      <Header hasTabs>
        <Left>
          <Button
            transparent
            onPress={() => NavigationService.navigate('UserHome')}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Emergency Request</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        <Formik
          initialValues={{}}
          validationSchema={{}}
          onSubmit={values => {
            // NOTE: dispatch(createRequest())
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
              <PickerItems items={items} />
              <Spacer height={48} />
              <Button
                onPress={handleSubmit}
                disabled={isSubmitting || isValidating}
                full
                primary>
                <Text>Submit</Text>
              </Button>
              <Spacer height={16} />
              <Button
                onPress={() => NavigationService.navigate('AddInfo')}
                full
                transparent
                small>
                <Text>I want to add more info</Text>
              </Button>
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  )
}

export default UserRequestScreen
