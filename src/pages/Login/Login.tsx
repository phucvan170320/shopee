import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { schema, Schema } from '../../utils/rules'
// import { login } from '../../apis/auth.api'
import { isAxiosUnprocessableEntityError } from '../../utils/ultils'
import { ErrorResponse } from '../../types/ultil.type'
import Input from '../../components/Input/index'
import { AppContext } from '../../contexts/app.context'
import Button from '../../components/Button/Button'
import authApi from '../../apis/auth.api'

type FormData = Pick<Schema, 'email' | 'password'>
const loginschema = schema.pick(['email', 'password'])

function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
    // getValues
  } = useForm<FormData>({
    resolver: yupResolver(loginschema)
  })
  const registerAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body)
  })
  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.login(body)
  })
  const onSubmit = handleSubmit((data) => {
    registerAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof FormData],
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
  return (
    <>
      <div className='bg-orange'>
        <div className='mx-auto max-w-7xl px-4'>
          <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32'>
            <div className='bg-white p-10 lg:col-span-2 lg:col-start-4'>
              <div className=''>
                <form action='' className='bg-white p-3 shadow-sm' onSubmit={onSubmit} noValidate>
                  <div className='text-2xl'>Dang Nhap</div>
                  <div className='mt-8'>
                    <Input
                      name='email'
                      type={'email'}
                      autoComplete='on'
                      className='mt-8 '
                      placeholder='Email'
                      errorMessage={errors.email?.message}
                      register={register}
                      // rules={rules.email}
                    />
                  </div>

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
                  <Button
                    isLoading={loginMutation.isLoading}
                    disabled={loginMutation.isLoading}
                    className='mt-5 flex w-full items-center justify-center rounded-lg bg-[#ee4d2d]  py-4 px-2 text-center uppercase shadow-md hover:bg-[red] hover:font-bold'
                  >
                    Đăng Nhập
                  </Button>
                  <div className='mt-8'>
                    <div className='flex items-center justify-between font-[700]'>
                      <span className='text-gray-500'>Bạn chưa có tài khoản ?</span>
                      <Link to='/register' className='text-red-500'>
                        Đăng Kí
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
