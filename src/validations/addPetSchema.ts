import * as yup from 'yup';

import { format } from 'date-fns';

export const addPetSchema = yup.object().shape({
  imgURL: yup
    .string()
    .required('Image URL is required')
    .matches(
      /^(https?:\/\/.*\.(png|jpg|jpeg|gif|bmp|webp)|data:image\/(png|jpg|jpeg|gif|bmp|webp);base64,)/,
      'Invalid image format'
    ),
  title: yup.string().required('Title is required'),
  name: yup.string().required("Pet's name is required"),
  birthday: yup
    .string()
    .transform((value, originalValue) => {
      if (originalValue instanceof Date) {
        return format(originalValue, 'dd.MM.yyyy');
      }
      return originalValue;
    })
    .required('Birthday is required')
    .matches(/^\d{2}\.\d{2}\.\d{4}$/, 'Date format must be DD.MM.YYYY'),
  species: yup.string().required('Type of pet is required'),
  sex: yup.string().oneOf(['male', 'female', 'unknown', 'multiple']),
});
