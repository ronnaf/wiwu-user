import * as Yup from 'yup'

export const signupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid Email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short! Must be atleast 8 characters!')
    .test(
      'isStrong',
      `Password must contain a lowercase letter, an uppercase letter, a number and one of the following characters: !@#$&*`,
      value => {
        const regex = new RegExp(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*]).{8,}$'
        )
        return regex.test(value)
      }
    )
    .required('Required!'),
  phoneNumber: Yup.number()
    .test('isPhoneNumber', 'Must be a valid 10 digit phone number!', value => {
      const regex = new RegExp('^(?=.*[0-9]{10}$)')
      return regex.test(value)
    })
    .required('Required')
})
