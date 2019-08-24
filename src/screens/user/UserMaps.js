import React from 'react'
import { Container, Content } from 'native-base'

import Map from '../../components/Map'
import GenericHeader from '../../components/GenericHeader'
import Footer from '../../components/Footer'

const UserMaps = props => {
  return (
    <Container>
      <GenericHeader title='Maps' type='drawer' />
      <Content
        padder
        style={{
          height: '80%'
        }}>
        <Map />
      </Content>
      <Footer active='map' />
    </Container>
  )
}

export default UserMaps
