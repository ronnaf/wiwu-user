import React, { useEffect } from 'react'
import { Container } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { createAction } from 'redux-actions'

import { firestore } from '../../firebase'

import Map from '../../components/Map'
import GenericHeader from '../../components/GenericHeader'
import Footer from '../../components/Footer'

import { GET_ALL_EMERGENCIES } from '../../actions/emergency/emergency.constants'

import showToast from '../../helpers/toast.helper'

export const useGetEmergenciesListener = () => {
  const dispatch = useDispatch()
  const isOffline = useSelector(state => state.user.netInfo.isOffline)

  useEffect(() => {
    try {
      const listenerRef = firestore
        .collection('emergencies')
        .where('status', '==', 'PENDING')
        .onSnapshot(snapshot => {
          console.log('triggered')
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
          dispatch(createAction(GET_ALL_EMERGENCIES)(emergencies))
        })

      return function cleanup() {
        listenerRef()
      }
    } catch (e) {
      showToast('No connection found')
    }
  }, [isOffline])
}

const UserMaps = () => {
  const emergencies = useSelector(({ emergency }) => emergency.list)

  useGetEmergenciesListener()

  return (
    <Container>
      <GenericHeader title='Maps' type='drawer' />
      <Map pins={emergencies} />
      <Footer active='map' />
    </Container>
  )
}

export default UserMaps
