'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { FormDataSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { LightMode, DarkMode } from '@mui/icons-material';


type Inputs = z.infer<typeof FormDataSchema>

const steps = [
  {
    id: 'Step 1',
    name: 'Personal Information',
    fields: ['firstName', 'lastName', 'email']
  },
  {
    id: 'Step 2',
    name: 'Address Details',
    fields: ['country', 'state', 'city', 'street', 'zip']
  },
  {
    id: 'Step 3',
    name: 'Preferences',
    fields: ['newsletter', 'terms', 'contactMethod']
  },
  { id: 'Step 4', name: 'Review & Submit' }
]

export default function Form() {
  const [currentStep, setCurrentStep] = useState(0)
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema)
  })

  const processForm: SubmitHandler<Inputs> = data => {
    console.log(data)
    reset()
  }

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as (keyof Inputs)[], { shouldFocus: true })

    if (!output) return

    if (currentStep < steps.length - 1) {
      setCurrentStep(step => step + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Effect to add/remove dark class on body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)'; // Add fallback for the body
    } else {
      document.body.classList.remove('dark');
      document.body.style.backgroundColor = 'rgb(255, 255, 255)'; // Fallback for light mode
    }
  }, [darkMode]);
  

  return (
    <section className={`absolute inset-0 flex flex-col justify-between p-24 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Dark Mode Toggle Switch */}
      <div className="flex justify-end mb-4">
  <button onClick={toggleDarkMode} className="flex items-center">
    {darkMode ? (
      <LightMode className="text-yellow-500" /> // Light Mode Icon
    ) : (
      <DarkMode className="text-gray-500" />   // Dark Mode Icon
    )}
    <span className="ml-2">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
  </button>
</div>


      {/* Steps Navigation */}
      <nav aria-label='Progress'>
        <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
          {steps.map((step, index) => (
            <li key={step.name} className='md:flex-1'>
              <div className={`flex w-full flex-col border-l-4 ${currentStep >= index ? 'border-sky-600' : 'border-gray-200'} py-2 pl-4`}>
                <span className='text-sm font-medium text-sky-600'>{step.id}</span>
                <span className='text-sm font-medium'>{step.name}</span>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      {/* Form Sections */}
      <form className='mt-12 py-12' onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <h2 className='text-base font-semibold leading-7 '>{darkMode ? 'Personal Information' : 'Personal Information'}</h2>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label htmlFor='firstName' className='block text-sm font-medium leading-6'>{darkMode ? 'First name' : 'First name'}</label>
                <input type='text' id='firstName' {...register('firstName')} onChange={(e) => setValue('firstName', e.target.value)} className={`mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-sky-600 ${darkMode ? 'text-white bg-gray-800' : 'text-gray-900 bg-white'}`} />
                {errors.firstName && <p className='mt-1 text-sm text-red-600'>{errors.firstName.message}</p>}
              </div>

              <div className='sm:col-span-3'>
                <label htmlFor='lastName' className='block text-sm font-medium leading-6'>{darkMode ? 'Last name' : 'Last name'}</label>
                <input type='text' id='lastName' {...register('lastName')} onChange={(e) => setValue('lastName', e.target.value)} className={`mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-sky-600 ${darkMode ? 'text-white bg-gray-800' : 'text-gray-900 bg-white'}`} />
                {errors.lastName && <p className='mt-1 text-sm text-red-600'>{errors.lastName.message}</p>}
              </div>

              <div className='sm:col-span-6'>
                <label htmlFor='email' className='block text-sm font-medium leading-6'>{darkMode ? 'Email' : 'Email'}</label>
                <input type='email' id='email' {...register('email')} onChange={(e) => setValue('email', e.target.value)} className={`mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-sky-600 ${darkMode ? 'text-white bg-gray-800' : 'text-gray-900 bg-white'}`} />
                {errors.email && <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>}
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <h2 className='text-base font-semibold leading-7'>{darkMode ? 'Address Details' : 'Address Details'}</h2>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-6'>
                <label htmlFor='country' className='block text-sm font-medium leading-6'>{darkMode ? 'Country' : 'Country'}</label>
                <input type='text' id='country' {...register('country')} onChange={(e) => setValue('country', e.target.value)} className={`mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-sky-600 ${darkMode ? 'text-white bg-gray-800' : 'text-gray-900 bg-white'}`} />
                {errors.country && <p className='mt-1 text-sm text-red-600'>{errors.country.message}</p>}
              </div>

              <div className='sm:col-span-3'>
                <label htmlFor='state' className='block text-sm font-medium leading-6'>{darkMode ? 'State' : 'State'}</label>
                <input type='text' id='state' {...register('state')} onChange={(e) => setValue('state', e.target.value)} className={`mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-sky-600 ${darkMode ? 'text-white bg-gray-800' : 'text-gray-900 bg-white' }`} />
                {errors.state && <p className='mt-1 text-sm text-red-600'>{errors.state.message}</p>}
              </div>

              <div className='sm:col-span-3'>
                <label htmlFor='city' className='block text-sm font-medium leading-6'>{darkMode ? 'City' : 'City'}</label>
                <input type='text' id='city' {...register('city')} onChange={(e) => setValue('city', e.target.value)} className={`mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-sky-600 ${darkMode ? 'text-white bg-gray-800' : 'text-gray-900 bg-white'}`} />
                {errors.city && <p className='mt-1 text-sm text-red-600'>{errors.city.message}</p>}
              </div>

              <div className='sm:col-span-6'>
                <label htmlFor='street' className='block text-sm font-medium leading-6'>{darkMode ? 'Street' : 'Street'}</label>
                <input type='text' id='street' {...register('street')} onChange={(e) => setValue('street', e.target.value)} className={`mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-sky-600 ${darkMode ? 'text-white bg-gray-800' : 'text-gray-900 bg-white'}`} />
                {errors.street && <p className='mt-1 text-sm text-red-600'>{errors.street.message}</p>}
              </div>

              <div className='sm:col-span-3'>
                <label htmlFor='zip' className='block text-sm font-medium leading-6'>{darkMode ? 'Zip Code' : 'Zip Code'}</label>
                <input type='text' id='zip' {...register('zip')} onChange={(e) => setValue('zip', e.target.value)} className={`mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-sky-600 ${darkMode ? 'text-white bg-gray-800' : 'text-gray-900 bg-white'}`} />
                {errors.zip && <p className='mt-1 text-sm text-red-600'>{errors.zip.message}</p>}
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <h2 className='text-base font-semibold leading-7'>{darkMode ? 'Preferences' : 'Preferences'}</h2>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-6 flex items-center'>
                <input
                  type='checkbox'
                  id='newsletter'
                  {...register('newsletter')}
                  className='mr-2 h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-600'
                />
                <label htmlFor='newsletter' className={`text-sm font-medium leading-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Subscribe to Newsletter
                </label>
                {errors.newsletter && (
                  <p className='mt-1 text-sm text-red-600'>{errors.newsletter.message}</p>
                )}
              </div>

              <div className='sm:col-span-6 flex items-center'>
                <div>
                <input
                  type='checkbox'
                  id='terms'
                  {...register('terms')}
                  className='mr-2 h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-600'
                />
                <label htmlFor='terms' className={`text-sm font-medium leading-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  I agree to the terms and conditions
                </label>
                <div className='flex-col'>
                {errors.terms && (
                  <p className='mt-1 text-sm text-red-600'>{errors.terms.message}</p>
                )}
                </div>
                </div>

              </div>

              <h3 className={`text-sm font-medium leading-6 ${darkMode ? 'text-white' : 'text-gray-900'} mt-4`}>Preferred Contact Method</h3>
              <div className='mt-2 space-y-4'>
                <div className='flex items-center'>
                  <input
                    type='radio'
                    id='contactMethodEmail'
                    value='Email'
                    {...register('contactMethod')}
                    className='h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-600'
                  />
                  <label htmlFor='contactMethodEmail' className={`ml-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Email
                  </label>
                </div>
                <div className='flex items-center'>
                  <input
                    type='radio'
                    id='contactMethodPhone'
                    value='Phone'
                    {...register('contactMethod')}
                    className='h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-600'
                  />
                  <label htmlFor='contactMethodPhone' className={`ml-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Phone
                  </label>
                </div>
                <div className='flex items-center'>
                  <input
                    type='radio'
                    id='contactMethodSMS'
                    value='SMS'
                    {...register('contactMethod')}
                    className='h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-600'
                  />
                  <label htmlFor='contactMethodSMS' className={`ml-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    SMS
                  </label>
                </div>
                {errors.contactMethod && (
                  <p className='mt-1 text-sm text-red-600'>{errors.contactMethod.message}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <h2 className='text-base font-semibold leading-7'>{darkMode ? 'Review & Submit' : 'Review & Submit'}</h2>
            <div className='mt-10'>
              <h3 className='text-lg font-medium'>Personal Information</h3>
              <p>First Name: {watch('firstName')}</p>
              <p>Last Name: {watch('lastName')}</p>
              <p>Email: {watch('email')}</p>

              <h3 className='text-lg font-medium mt-4'>Address Details</h3>
              <p>Country: {watch('country')}</p>
              <p>State: {watch('state')}</p>
              <p>City: {watch('city')}</p>
              <p>Street: {watch('street')}</p>
              <p>Zip Code: {watch('zip')}</p>

              <h3 className='text-lg font-medium mt-4'>Preferences</h3>
              <p>Newsletter Subscription: {watch('newsletter') ? 'Yes' : 'No'}</p>
              <p>Terms Accepted: {watch('terms') ? 'Yes' : 'No'}</p>
              <p>Preferred Contact Method: {watch('contactMethod') || 'Not specified'}</p>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className='mt-8 flex justify-between'>
          <button
            type='button'
            onClick={prev}
            disabled={currentStep === 0}
            className={`inline-flex justify-center rounded-md border border-gray-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'} px-4 py-2 text-sm font-medium shadow-sm ${currentStep === 0 ? 'cursor-not-allowed' : 'hover:bg-gray-50'}`}
          >
            Back
          </button>

          <button type='button' onClick={next} className={`inline-flex justify-center rounded-md border border-transparent ${darkMode ? 'bg-sky-600 text-white hover:bg-sky-700' : 'bg-sky-600 text-white hover:bg-sky-700'} px-4 py-2 text-sm font-medium shadow-sm`}>
            {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </section>
  )
}