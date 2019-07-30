import Toast from 'react-native-root-toast'

export const toast = errorMessage => {
  Toast.show(errorMessage || 'Error', {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  })
}
export default toast
