import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

function Login() {
  // const {} = useForm()
  return (
    <>
      <div className='bg-orange'>
        <div className='mx-auto max-w-7xl px-4'>
          <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32'>
            <div className='bg-white p-10 lg:col-span-2 lg:col-start-4'>
              <div className=''>
                <form action='' className='bg-white p-3 shadow-sm'>
                  <div className='text-2xl'>Dang Nhap</div>
                  <div className='mt-8'>
                    <input
                      type='email '
                      name='email'
                      placeholder='Email'
                      autoComplete='on'
                      className='w-full rounded-sm border border-gray-300 
                    p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                    />
                  </div>
                  <div className='mt-8'>
                    <input
                      type='password'
                      name='password'
                      autoComplete='on'
                      placeholder='password'
                      className='w-full rounded-sm border border-gray-300 
                p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                    />
                  </div>
                  <button className='mt-5 w-full rounded-lg bg-[#ee4d2d] py-4 px-2 text-center  uppercase shadow-md hover:bg-[aqua]'>
                    Đăng Nhập
                  </button>
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
