import React, { useEffect } from 'react'
import { Container } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'

import Map from '../../components/Map'
import GenericHeader from '../../components/GenericHeader'
import Footer from '../../components/Footer'

import { getEmergencies } from '../../actions/emergency/getEmergencies.action'

const UserMaps = () => {
  const dispatch = useDispatch()
  const emergencies = useSelector(e => e.emergency.list)

  useEffect(() => {
    dispatch(getEmergencies())
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
