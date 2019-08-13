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
import NavigationService from '../../navigation/NavigationService'
import Spacer from '../../components/Spacer'
import PickerItem from '../../components/PickerItem'

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

const UserRequest = () => {
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
          <Title>Emergency Request</Title>
        </Body>
        <Right />
      </Header>
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
              {items.map(item => {
                return (
                  <PickerItem
                    question={item.question}
                    answers={item.answers}
                    setFieldValue={setFieldValue}
                    key={`picker.${items.indexOf(item)}`}
                  />
                )
              })}
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
                onPress={() =>
                  NavigationService.navigate('UserRequestAdd', { values })
                }
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

export default UserRequest
