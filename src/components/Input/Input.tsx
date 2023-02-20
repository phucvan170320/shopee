import React, { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'
import { registerAccount } from '../../apis/auth.api'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  classNameInput?: string
  classNameError?: string
}
function Input({
  type,
  placeholder,
  name,
  className,
  register,
  rules,
  errorMessage,
  autoComplete,
  classNameError = 'mt-[0.5rem] min-h-[1.25rem] text-sm font-[900] text-red-900',
  classNameInput = 'w-full rounded-sm border border-gray-300  p-1 outline-none focus:border-gray-500 focus:shadow-sm'
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input
        type={type}
        // {...register('email', rules.email)}
        {...registerResult}
        placeholder={placeholder}
        className={classNameInput}
        autoComplete={autoComplete}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}

export default Input
