import React, { useEffect } from 'react'
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
import Footer from '../../components/Footer'
import { firestore, firebase } from '../../firebase'
import { createAction } from 'redux-actions'
import showToast from '../../helpers/toast.helper'
import { useDispatch, useSelector } from 'react-redux'
import { GET_ALERTS } from '../../actions/alert/alert.constants'
import _ from 'lodash'

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
          {alerts.map(alert => {
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
          })}
        </List>
      </Content>
      <Footer active='notifications' />
    </Container>
  )
}

export default EmergencyAlertsList
