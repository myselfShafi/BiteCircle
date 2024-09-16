import * as Yup from 'yup';
import {LoginInput} from '../configs/types';

// a wrapper function to enforce strict typing
const createYupSchema = <T extends object>(
  schema: Yup.ObjectSchema<T>,
): Yup.ObjectSchema<T> => schema;

export const LoginSchema = createYupSchema<LoginInput>(
  Yup.object().shape({
    email: Yup.string().email('Invalid email!').required('Email is required!'),
    password: Yup.string()
      .min(8, 'Password must be atleast 8 characters!')
      .max(16, 'Password cannot be more than 16 characters!')
      .required('Password is required!'),
  }),
);
