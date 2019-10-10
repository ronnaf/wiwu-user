import * as Yup from 'yup'

const phoneRegex = /^(09|\+639)\d{9}$/
const nameRegex = /^[A-Za-z ]+$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*]).{8,}$/

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
    .matches(
      passwordRegex,
      'Password must contain a lowercase letter, an uppercase letter, a number and one of the following characters: !@#$&*'
    )
    .required('Required!'),
  phoneNumber: Yup.string()
    .matches(phoneRegex, 'Must be a valid 11 digit phone number!')
    .required('Required')
})

export const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required')
})

export const EditSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email')
    .required('Required'),
  firstName: Yup.string()
    .matches(nameRegex, 'Invalid name string!')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .matches(nameRegex, 'Invalid name string!')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  phoneNumber: Yup.string()
    .matches(phoneRegex, 'Must be a valid 11 digit phone number!')
    .required('Required')
})
