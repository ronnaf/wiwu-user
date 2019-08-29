export const checkOnlineStatus = ({ type, effectiveType }) => {
  return (
    type === 'wifi' ||
    (type === 'cellular' &&
      (effectiveType === '3g' ||
        effectiveType === '4g' ||
        effectiveType === '5g'))
  )
}
