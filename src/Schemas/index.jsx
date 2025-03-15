import * as Yup from 'yup';


export const DeliverySchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, 'First Name must be at least 3 characters')
    .max(15, 'First Name must be less than 15 characters')
    .required('First Name is required'),
  lastname: Yup.string()
    .min(3, 'Last Name must be at least 3 characters')
    .max(15, 'Last Name must be less than 15 characters'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
});


// Schema for Shipping Information (Step 2)
export const ShippingSchema = Yup.object().shape({
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  address: Yup.string().required('Address is required'),
  zip: Yup.string().required('Zip is required').max(5, 'Zip must be 5 characters').min(5, 'Zip must be 5 characters'),
  //phone: Yup.string()
  //.matches(/^\+92\d{10}$/, 'Phone number must be in the format: +92XXXXXXXXXX')
 // .required('Phone number is required'),

});