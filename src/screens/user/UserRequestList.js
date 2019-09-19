import React from 'react'
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Text
} from 'native-base'
import GenericHeader from '../../components/GenericHeader'
import { images } from '../../assets/assets'
import moment from 'moment'
import NavigationService from '../../navigation/NavigationService'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { useGetEmergenciesListener } from './UserMaps'

const UserRequestList = props => {
  const emergencies = useSelector(({ emergency }) => emergency.list)

  useGetEmergenciesListener()

  return (
    <Container>
      <GenericHeader title='Emergency Requests' type='drawer' />
      <Content padder>
        <List>
          {!_.isEmpty(emergencies) &&
            emergencies.map(emergency => (
              <ListItem
                key={emergency.id}
                thumbnail
                onPress={() =>
                  NavigationService.navigate('UserRequestDetails', {
                    emergency
                  })
                }
                style={{ marginLeft: 0 }}>
                <Left>
                  <Thumbnail
                    source={
                      emergency.media
                        ? { uri: emergency.media }
                        : images[emergency.department]
                    }
                  />
                </Left>
                <Body>
                  <Text>
                    You requested for{' '}
                    <Text style={{ fontWeight: 'bold' }}>
                      {emergency.department}
                    </Text>{' '}
                    assistance
                  </Text>
                  <Text note numberOfLines={1}>
                    {emergency.role}{' '}
                    {emergency.description && `- ${emergency.description}`}
                  </Text>
                  <Text note numberOfLines={1}>
                    {moment(emergency.date).format('MMM DD, YYYY - hh:mmA')}
                  </Text>
                </Body>
              </ListItem>
            ))}
        </List>
      </Content>
    </Container>
  )
}

export default UserRequestList
