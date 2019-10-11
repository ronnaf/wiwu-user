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
  View
} from 'native-base'
import { Image } from 'react-native'
import GenericHeader from '../../components/GenericHeader'
import { images } from '../../assets/assets'
import moment from 'moment'
import Footer from '../../components/Footer'
import { firestore, firebase } from '../../firebase'
import { createAction } from 'redux-actions'
import showToast from '../../helpers/toast.helper'
import { useDispatch, useSelector } from 'react-redux'
import { GET_ALERTS } from '../../actions/alert/alert.constants'
import _ from 'lodash'
import Spacer from '../../components/Spacer'

const EmergencyAlertsList = props => {
  const dispatch = useDispatch()
  const { user, alert } = useSelector(state => state)
  const { isOffline } = user.netInfo
  const { list: alerts } = alert

  useEffect(() => {
    try {
      if (!isOffline) {
        const listenerRef = firestore
          .collection('emergency-alerts')
          .where('status', '==', 'active')
          .orderBy('date', 'asc')
          .onSnapshot(snapshot => {
            const alerts = snapshot.docs.map(alertDoc => {
              const alert = alertDoc.data()

              return { ...alert, id: alertDoc.id }
            })

            dispatch(createAction(GET_ALERTS)(_.reverse(alerts)))
          })

        return function cleanup() {
          listenerRef()
        }
      }
    } catch (e) {
      showToast('No connection found', 'error')
    }
  }, [isOffline])

  console.log('alerts -', alerts)

  return (
    <Container>
      <GenericHeader title='Emergency Alerts' type='drawer' />
      <Content padder>
        <List>
          {!_.isEmpty(alerts) ? (
            alerts.map(alert => {
              const alertTimestamp = new firebase.firestore.Timestamp(
                alert.date.seconds,
                alert.date.nanoseconds
              )
              return (
                <ListItem key={alert.id} thumbnail style={{ marginLeft: 0 }}>
                  <Left>
                    <Thumbnail source={images.logo} />
                  </Left>
                  <Body>
                    <Text>{alert.message}</Text>
                    <Text note numberOfLines={1}>
                      {moment(alertTimestamp.toDate()).format(
                        'MMM DD, YYYY - hh:mmA'
                      )}
                    </Text>
                  </Body>
                </ListItem>
              )
            })
          ) : (
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Spacer height={32} />
              <Image
                resizeMode={'contain'}
                source={images.emptyState}
                style={{ height: 100, width: 100 }}
              />
              <Spacer height={16} />
              <Text style={{ color: '#707070', fontSize: 14 }}>
                No alerts available
              </Text>
            </View>
          )}
        </List>
      </Content>
      <Footer active='notifications' />
    </Container>
  )
}

export default EmergencyAlertsList
