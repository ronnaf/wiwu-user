import React, { useEffect } from 'react'
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Text,
  Tab,
  Tabs
} from 'native-base'
import GenericHeader from '../../components/GenericHeader'
import { images } from '../../assets/assets'
import moment from 'moment'
import NavigationService from '../../navigation/NavigationService'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { useGetEmergenciesListener } from './UserMaps'
import EmptyState from '../../components/EmptyState'
import { firestore } from '../../firebase'
import { createAction } from 'redux-actions'
import { useDispatch } from 'react-redux'
import { GET_OWN_EMERGENCIES } from '../../actions/emergency/emergency.constants'
import showToast from '../../helpers/toast.helper'

const RequestList = props => {
  const { emergencies, emptyStateTitle, isFromBroadcast } = props
  return (
    <List>
      {!_.isEmpty(emergencies) ? (
        emergencies.map(emergency => (
          <ListItem
            key={emergency.id}
            thumbnail
            onPress={() =>
              NavigationService.navigate('UserRequestDetails', {
                emergency: { ...emergency, isFromBroadcast }
              })
            }
            style={{ marginLeft: 0 }}>
            <Left>
              <Thumbnail source={images[emergency.department]} />
            </Left>
            <Body>
              <Text>
                {emergency.isFromBroadcast ? 'A' : 'You requested for'}{' '}
                <Text style={{ fontWeight: 'bold' }}>
                  {emergency.department}
                </Text>{' '}
                {emergency.isFromBroadcast ? 'request was made' : 'assistance'}
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
        ))
      ) : (
        <EmptyState title={emptyStateTitle} />
      )}
    </List>
  )
}

const UserRequestList = props => {
  const dispatch = useDispatch()
  const { user, emergency } = useSelector(state => state)
  const { current: loggedInUser, netInfo } = user
  const { list: emergencies, myEmergencies } = emergency

  useGetEmergenciesListener()

  useEffect(() => {
    try {
      if (!netInfo.isOffline) {
        const userIdDocRef = firestore.collection('users').doc(loggedInUser.uid)

        const emergenciesListenerRef = firestore
          .collection('emergencies')
          .where('userId', '==', userIdDocRef)
          .orderBy('date')
          .onSnapshot(snapshot => {
            const emergencies = snapshot.docs.map(emergencyDoc => {
              const emergency = emergencyDoc.data()

              return {
                id: emergencyDoc.id,
                address: emergency.address,
                date: emergency.date.toDate(),
                department: emergency.department,
                description: emergency.description,
                location: emergency.location,
                media: emergency.media,
                priority: emergency.priority,
                role: emergency.role,
                status: emergency.status
              }
            })

            dispatch(createAction(GET_OWN_EMERGENCIES)(_.reverse(emergencies)))
          })

        return function cleanup() {
          emergenciesListenerRef()
        }
      }
    } catch (e) {
      showToast(e.message, 'error')
    }
  }, [netInfo.isOffline])

  return (
    <Container>
      <GenericHeader title='Emergency Requests' type='drawer' />
      <Tabs>
        <Tab heading='Broadcast'>
          <Content padder>
            <RequestList
              emergencies={emergencies}
              emptyStateTitle={`No requests available`}
              isFromBroadcast={true}
            />
          </Content>
        </Tab>
        <Tab heading='My Requests'>
          <Content padder>
            <RequestList
              emergencies={myEmergencies}
              emptyStateTitle={`You don't have requests yet`}
              isFromBroadcast={false}
            />
          </Content>
        </Tab>
      </Tabs>
    </Container>
  )
}

export default UserRequestList
