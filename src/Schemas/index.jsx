import * as Yup from 'yup';
export const OrderSchema = Yup.object().shape({
  firstname: Yup.string().min(3).max(15).required('First Name is required'),

  lastname: Yup.string().min(3).max(15),
  email: Yup.string().email('Invalid email').required('Email is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  country: Yup.string().required('Country is required'),
  zip: Yup.string().required('Zip is required')
});