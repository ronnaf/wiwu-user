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

const UserMaps = () => {
  const dispatch = useDispatch()
  const emergencies = useSelector(e => e.emergency.list)

  useEffect(() => {
    try {
      const listenerRef = firestore
        .collection('emergencies')
        .where('status', '==', 'PENDING')
        .onSnapshot(snapshot => {
          const emergencies = snapshot.docs.map(e => {
            const data = e.data()

            return {
              id: e.id,
              location: data.location,
              department: data.department
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
  }, [])

  return (
    <Container>
      <GenericHeader title='Maps' type='drawer' />
      <Map pins={emergencies} />
      <Footer active='map' />
    </Container>
  )
}

export default UserMaps
