import * as yup from 'yup';

export interface FormData {
  name: string;
  email: string;
  avatar: string;
  phone: string;
}

export const editUserSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email format')
    .required('Email is required'),
  avatar: yup
    .string()
    .matches(/^https?:\/\/.*\.(png|jpg|jpeg|gif|bmp|webp)$/, 'Invalid image URL')
    .required('Avatar URL is required'),
  phone: yup
    .string()
    .matches(/^\d{9}$/, 'Phone must be 9 digits')
    .required('Phone is required'),
});