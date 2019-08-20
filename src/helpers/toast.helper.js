import Toast from 'react-native-root-toast'

/**
 * generic toast
 *
 * @param {string} message toast message
 * @param {string} type could be ['error', 'success', 'warning', or nothing]
 */
export const showToast = (message, type) => {
  let backgroundColor
  if (type === 'error') {
    backgroundColor = '#C4281B'
  } else if (type === 'success') {
    backgroundColor = '#508B46'
  } else if (type === 'warning') {
    backgroundColor = '#F4AB3C'
  } else {
    backgroundColor = null
  }

  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor
  })
}

export default showToast
