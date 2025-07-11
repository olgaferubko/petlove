import * as Yup from 'yup'

export const loginSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'Enter a valid Email'
    ),
  password: Yup.string()
    .required('Password is required')
    .min(7, 'Password must be at least 7 characters'),
});