import React from 'react'
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Right,
  Body,
  Icon,
  View,
  Button
} from 'native-base'
import GenericHeader from '../../components/GenericHeader'
import Spacer from '../../components/Spacer'
import Map from '../../components/Map'
import GenericField from '../../components/GenericField'

const Contact = () => {
  return (
    <Container>
      <GenericHeader title={'Contact'} type='back' />
      <Content padder>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          West Visayas State University Medical Center
        </Text>
        <Spacer height={4} />
        <Text note>E. Lopez St., Jaro, Iloilo City</Text>
        <Spacer height={16} />
        <View style={{ flexDirection: 'row' }}>
          <Button style={{ marginRight: 8 }} small rounded>
            <Icon name={'chatboxes'} />
          </Button>
          <Button style={{ marginRight: 8 }} small rounded>
            <Icon name={'call'} />
          </Button>
        </View>
        <Spacer height={16} />

        <GenericField
          label={'Contact Numbers'}
          CustomComponent={
            <List>
              {['+63 955 453 4759', '+63 926 134 2587'].map(number => (
                <ListItem style={{ marginLeft: 0 }}>
                  <Body>
                    <Text>{number}</Text>
                  </Body>
                  <Right
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end'
                    }}>
                    <Icon style={{ color: 'green' }} name={'call'} />
                    <Icon style={{ marginLeft: 16 }} name={'arrow-forward'} />
                  </Right>
                </ListItem>
              ))}
            </List>
          }
        />

        <GenericField
          label={'Location'}
          CustomComponent={
            <View style={{ height: 300 }}>
              {/* TODO: add ability to disable search */}
              <Map />
            </View>
          }
        />
      </Content>
    </Container>
  )
}

export default Contact
