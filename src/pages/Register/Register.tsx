import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getRules } from '../../utils/rules'
import { getRandomValues } from 'crypto'
import Input from '../..//components/Input'
import { schema, Schema } from '../../utils/rules'
import * as yup from 'yup'
// import {} from '@hookform/resolvers/yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
// import { registerAccount } from '../../apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from '../../utils/ultils'
import { error } from 'console'
import { ErrorResponse } from '../../types/ultil.type'
import { AppContext } from '../../contexts/app.context'
import authApi from '../../apis/auth.api'
import Button from '../../components/Button/Button'

// interface FormData {
//   email: string
//   confirm_password: string
//   password: string
// }
type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
    // getValues
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })
  // const rules = getRules(getValues)
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
          // if (formError?.email) {
          //   setError('email', {
          //     message: formError.email,
          //     type: 'Server'
          //   })
          // }
          // if (formError?.password) {
          //   setError('password', {
          //     message: formError.password,
          //     type: 'Server'
          //   })
          // }
        }
      }
    })
  })
  // console.log('errors:', errors)

  return (
    <div>
      <div className='bg-orange'>
        <div className='mx-auto max-w-7xl px-4'>
          <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32'>
            <div className='bg-white p-10 lg:col-span-2 lg:col-start-4'>
              <div className=''>
                <form onSubmit={onSubmit} className='bg-white p-3 shadow-sm' noValidate>
                  {/* noValidate để bỏ cái check xem cái email có giống với cái form không */}
                  <div className='text-2xl'>Dang Ky</div>
                  <Input
                    name='email'
                    type={'email'}
                    autoComplete='on'
                    className='mt-8'
                    placeholder='Email'
                    errorMessage={errors.email?.message}
                    register={register}
                    // rules={rules.email}
                  />
                  {/* <div className='mt-8'>
                    <input
                      type='email'
                      {...register('email', rules.email)}
                      placeholder='Email'
                      className='w-full rounded-sm border border-gray-300 
                    p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                    />
                    <div className='mt-[0.5rem] min-h-[1.25rem] text-sm font-[900] text-red-900'>
                      {errors.email?.message}
                    </div>
                  </div> */}
                  <Input
                    name='password'
                    type='password'
                    placeholder='password'
                    autoComplete='on'
                    className='mt-8'
                    errorMessage={errors.password?.message}
                    register={register}
                    // rules={rules.password}
                  />
                  {/* <div className='mt-8'>
                    <input
                      type='password'
                      {...register('password', rules.password)}
                      placeholder='password'
                      autoComplete='on'
                      className='w-full rounded-sm border border-gray-300 
                       p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                    />
                    <div className='mt-[0.5rem] min-h-[1.25rem] text-sm font-[900] text-red-900'>
                      {errors.password?.message}
                    </div>
                  </div> */}
                  <Input
                    name='confirm_password'
                    type='password'
                    placeholder='Confirm password'
                    autoComplete='on'
                    register={register}
                    className='mt-8'
                    errorMessage={errors.confirm_password?.message}
                    // rules={rules.confirm_password}
                  />
                  {/* <div className='mt-8'>
                    <input
                      type='password'
                      placeholder='Confirm password'
                      autoComplete='on'
                      {...register('confirm_password', {
                        ...rules.confirm_password
                        // validate: (value) => {
                        //   if (value === getValues('password')) {
                        //     return true
                        //   } else {
                        //     return 'nhap lai mat khau cho khop'
                        //   }
                        // }
                      })}
                      className='w-full rounded-sm border border-gray-300 
                p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                    />
                    <div className='mt-[0.5rem] min-h-[1.25rem] text-sm font-[900] text-red-900'>
                      {errors.confirm_password?.message}
                    </div>
                  </div> */}
                  <Button
                    isLoading={registerAccountMutation.isLoading}
                    disabled={registerAccountMutation.isLoading}
                    className='fflex mt-5 w-full items-center justify-center rounded-lg border-[blue]  bg-[#ee4d2d] py-4 px-2 uppercase shadow-md hover:bg-[red] hover:font-bold'
                  >
                    đăng ký
                  </Button>
                  <div className='mt-8'>
                    <div className='flex items-center justify-between font-[700]'>
                      <span className='text-gray-500'>Bạn đã có tài khoản ?</span>
                      <Link to='/login' className='text-red-500'>
                        Đăng nhập
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
