import * as Yup from 'yup';
import {
  EmailInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from '../configs/types';

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

export const RegisterSchema = createYupSchema<RegisterInput>(
  Yup.object().shape({
    fullName: Yup.string().required('Full Name is required!'),
    email: Yup.string().email('Invalid email!').required('Email is required!'),
    password: Yup.string()
      .min(8, 'Password must be atleast 8 characters!')
      .max(16, 'Password cannot be more than 16 characters!')
      .required('Password is required!'),
  }),
);

export const EmailSchema = createYupSchema<EmailInput>(
  Yup.object().shape({
    email: Yup.string().email('Invalid email!').required('Email is required!'),
  }),
);

export const resetPasswordSchema = createYupSchema<ResetPasswordInput>(
  Yup.object().shape({
    newPassword: Yup.string()
      .min(8, 'New Password must be atleast 8 characters!')
      .max(16, 'New Password cannot be more than 16 characters!')
      .required('New Password is required!'),
    cnfNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match!')
      .required('Confirm Password is required!'),
  }),
);
