import React, { InputHTMLAttributes, forwardRef } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  // register?: UseFormRegister<any>
  // rules?: RegisterOptions
  classNameInput?: string
  classNameError?: string
}
const InputNumber = forwardRef<HTMLInputElement, Props>(function InputNumber({
  type,
  // placeholder,
  className,
  errorMessage,
  onChange,
  // autoComplete,
  classNameError = 'mt-[0.5rem] min-h-[1.25rem] text-sm font-[900] text-red-900',
  classNameInput = 'w-full rounded-sm border border-gray-300  p-1 outline-none focus:border-gray-500 focus:shadow-sm',
  ...rest
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      // Thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(event)
      // Cập nhật localValue state
      // setLocalValue(value)
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
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
