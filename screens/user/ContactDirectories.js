import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Container, Content } from 'native-base'
import Table from 'react-native-simple-table'

import GenericHeader from '../../components/GenericHeader'
import Footer from '../../components/Footer'

const tableData = [
  {
    name: 'Police Station 1 - City Proper',
    address: 'Gen. Luna St., Iloilo City',
    contactNumber: '337-9022',
    type: 'police'
  },
  {
    name: 'Police Station 2 - Lapaz District',
    address: 'Lapaz, Iloilo City',
    contactNumber: '329-0904'
  },
  {
    name: 'Police Station 3 - Jaro District',
    address: 'Jaro, Iloilo City',
    contactNumber: '329-7959'
  },
  {
    name: 'Police Station 4 - Molo District',
    address: 'Molo, Iloilo City',
    contactNumber: '337-9502'
  },
  {
    name: 'Police Station 5 - Mandurriao District',
    address: 'Mandurriao, Iloilo City',
    contactNumber: '337-2734'
  },
  {
    name: 'Police Station 6 - Arevalo District',
    address: 'Arevalo, Iloilo City',
    contactNumber: '337-9593'
  },
  {
    name: 'Fire Station 1 - City Proper District',
    address: 'City Proper',
    contactNumber: '337-3011;337-4989'
  },
  {
    name: 'FIre Station 2 - Lapaz District',
    address: 'Lapaz, Iloilo City',
    contactNumber: '320-0315'
  },
  {
    name: 'Fire Station 3 - Jaro District',
    address: 'Jaro, Iloilo City',
    contactNumber: '329-57'
  },
  {
    name: 'Fire Station 4 - Molo District',
    address: 'Molo, Iloilo City',
    contactNumber: ''
  },
  {
    name: 'Fire Station 5 - Mandurriao District',
    address: 'Mandurriao, Iloilo City',
    contactNumber: '321-2655'
  },
  {
    name: 'Fire Station 6 - Arevalo District',
    address: 'Arevalo, Iloilo City',
    contactNumber: '337-9593'
  },
  {
    name: 'ICAG Volunteer Brigade',
    address: '',
    contactNumber: '337-5931'
  },
  {
    name: 'Federation Of Iloilo Volunteer Fire Brigade',
    address: '',
    contactNumber: '337-9760'
  },
  {
    name: `Amosup Seamean's Hospital`,
    address: 'Onate-De Leon St., Mandurriao, Iloilo City',
    contactNumber: '321-2438;321-3523'
  },
  {
    name: `Iloilo Doctor's Hospital`,
    address: 'West Ave., Timawa, Molo, Iloilo City',
    contactNumber: '337-1749;337-8646'
  },
  {
    name: 'Iloilo Mission Hospital',
    address: 'Mission Road, Jaro, Iloilo City',
    contactNumber: '320-0321'
  },
  {
    name: 'Medicus Medical Center',
    address: 'Dra. Rizalina Bernardo Avenue, Mandurriao, Iloilo City',
    contactNumber: '508-588'
  },
  {
    name: 'Qualimed Hospital(Iloilo)',
    address: 'Donato Pison Ave., Mandurriao, Iloilo City',
    contactNumber: '321-5125;321-5119'
  },
  {
    name: `St. Paul's Hospital`,
    address: 'Donato Pison Ave., Mandurriao, Iloilo City',
    contactNumber: '337-1194'
  },
  {
    name: 'St. Therese MTCC Hospital',
    address: 'Jalandoni St., Iloilo City',
    contactNumber: '337-8275'
  },
  {
    name: 'The Medical City Iloilo',
    address: 'Locsin St., Molo, Iloilo City',
    contactNumber: '338-1507'
  },
  {
    name: 'Western Visayas Medical Center',
    address: 'Q. Abeto St., Mandurriao, Iloilo City',
    contactNumber: '321-2841'
  },
  {
    name: 'West Visayas State University Medical Center',
    address: 'E. Lopez St., Jaro, Iloilo City',
    contactNumber: '337-9502'
  },
  {
    name: 'Iloilo Red Cross',
    address: 'Bonifacio Drive, Iloilo City',
    contactNumber: '337-2359'
  },
  {
    name: 'Iloilo City Emergency Responders(ICER)',
    address: 'Freedom Grandstand, Iloilo City',
    contactNumber: '335-1554'
  }
]

const tableHead = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  },
  {
    title: 'Contact Number',
    dataIndex: 'contactNumber'
  }
]

const ContactDirectories = props => {
  return (
    <Container>
      <GenericHeader title='Contact Directory' />
      <Content padder>
        <Table
          columns={tableHead}
          dataSource={tableData}
          columnWidth={Dimensions.get('window').width / 3}
          height={500}
          bodyContainerStyle={styles.text}
        />
      </Content>
      <Footer active='contacts' />
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    padding: 15,
    backgroundColor: '#fff'
  },
  head: {
    height: 20,
    backgroundColor: '#f1f8ff'
  },
  text: {
    margin: 6,
    textAlign: 'center'
  },
  tableStyle: {
    borderWidth: 2,
    borderColor: '#c8e1ff'
  }
})

export default ContactDirectories
