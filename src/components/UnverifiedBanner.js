import React, { useEffect, createRef } from 'react'
import { View } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert'

const UnverifiedBanner = () => {
  const alertRef = createRef()

  useEffect(() => {
    alertRef.current.alertWithType(
      'warn',
      'Unverified Identity',
      'Some features may not be available.'
    )
  })

  return (
    <View>
      <DropdownAlert ref={alertRef} />
    </View>
  )
}

export default UnverifiedBanner
