import React, { InputHTMLAttributes, forwardRef, useState } from 'react'
import { ref } from 'yup'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  // register?: UseFormRegister<any>
  // rules?: RegisterOptions
  classNameInput?: string
  classNameError?: string
}
const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumber(
  {
    type,
    // placeholder,
    className,
    errorMessage,
    onChange,
    value = '',
    // autoComplete,
    classNameError = 'mt-[0.5rem] min-h-[1.25rem] text-sm font-[900] text-red-900 ',
    classNameInput = 'w-full rounded-sm border border-gray-300  p-1 outline-none focus:border-gray-500 focus:shadow-sm',
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      // Thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(event)
      // Cập nhật localValue state
      setLocalValue(value)
    }
  }
  return (
    <div className={className}>
      <input
        type={type}
        // {...register('email', rules.email)}
        onChange={handleChange}
        className={classNameInput}
        {...rest}
        ref={ref}
        value={value || localValue}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
