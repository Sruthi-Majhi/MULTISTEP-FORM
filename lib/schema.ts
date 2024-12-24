import { z } from 'zod';

export const FormDataSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  country: z.string().min(1, 'Country is required'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip is required'),
  newsletter: z.boolean().optional(), // Optional boolean for newsletter subscription
  terms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }), // Must be true to agree to terms
  contactMethod: z.enum(['Email', 'Phone', 'SMS'], {
    required_error: 'Please select a contact method',
    invalid_type_error: 'Please select a contact method',
  }),
});