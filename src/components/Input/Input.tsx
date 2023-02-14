import React from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props {
  type: React.HTMLInputTypeAttribute
  placeholder: string
  errorMessage?: string
  className?: string
  name: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
  autoComplete?: string
}
function Input({ type, placeholder, name, className, register, rules, errorMessage, autoComplete }: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        // {...register('email', rules.email)}
        {...register(name)}
        placeholder={placeholder}
        className='w-full rounded-sm border border-gray-300 
                    p-3 outline-none focus:border-gray-500 focus:shadow-sm'
        autoComplete={autoComplete}
      />
      <div className='mt-[0.5rem] min-h-[1.25rem] text-sm font-[900] text-red-900'>{errorMessage}</div>
    </div>
  )
}

export default Input
