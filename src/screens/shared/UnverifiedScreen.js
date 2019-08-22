import React from 'react'
import { View, Image } from 'react-native'
import { Text, Button } from 'native-base'
import { useSelector } from 'react-redux'

import { verifyUser } from '../../actions/user/verifyUser.action'
import { auth } from '../../firebase'

import Spacer from '../../components/Spacer'
import GenericUser from '../../assets/images/generic-user.png'

const UnverifiedScreen = props => {
  const isOffline = useSelector(state => state.user.netInfo.type === 'none')

  return (
    <View>
      <Spacer height={8} />
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Image
          style={{ height: 200, width: 200 }}
          resizeMode='center'
          source={GenericUser}
        />
        <Button disabled={isOffline} onPress={() => verifyUser()}>
          <Text>I have already done this</Text>
        </Button>
        <Button
          disabled={isOffline}
          onPress={() => auth.currentUser.sendEmailVerification()}>
          <Text>Resend</Text>
        </Button>
      </View>
      <Spacer height={8} />
    </View>
  )
}

export default UnverifiedScreen
