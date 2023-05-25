export const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  privacyPolicy: false,
};

export const validation = {
  firstName: { required: true, max: 32 },
  lastName: { required: true, max: 48 },
  email: { required: true, pattern: /^\S+@\S+\.\S+$/ },
  phone: { required: true, min: 6, max: 15, pattern: /^\d+$/ },
  message: { max: 250 },
  privacyPolicy: { required: true },
};