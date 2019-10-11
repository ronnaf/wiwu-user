import { Text, View } from 'native-base'
import Spacer from './Spacer'
import { Image } from 'react-native'
import { images } from '../assets/assets'
import React from 'react'

const EmptyState = props => {
  const { title } = props
  return (
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
      <Text style={{ color: '#707070', fontSize: 14 }}>{title}</Text>
    </View>
  )
}

export default EmptyState
