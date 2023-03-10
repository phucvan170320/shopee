import React from 'react'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from '../../../../constants/path'
// eslint-disable-next-line import/no-unresolved
import Input from 'src/components/Input'
// eslint-disable-next-line import/no-unresolved
import Button from 'src/components/Button'

import { Schema, schema } from '../../../../utils/rules'
import { QueryConfig } from '../../../../hooks/useQueryConfig'
import { Category } from '../../../../types/category.type'
import categoryApi from '../../../../apis/category.api'
import classNames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import InputNumber from '../../../../components/InputNumber/index'
import { type } from 'os'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from '../../../../types/ultil.type'
import { config } from 'process'
import RatingStars from '../RatingStars/RatingStars'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}
// export interface Category {
//   _id: string
//   name: string
// }
// type QueryConfig = {
//   page?: string | undefined
//   limit?: string | undefined
//   sort_by?: string | undefined
//   order?: string | undefined
//   exclude?: string | undefined
//   rating_filter?: string | undefined
//   price_max?: string | undefined
//   price_min?: string | undefined
//   name?: string | undefined
//   category?: string | undefined
// }

/**
 * Rule validate
 * Nếu có price_min và price_max thì price_max >= price_min
 * Còn không thì có price_min thì không có price_max và ngược lại
 */
type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>
// type FormData = {
//   price_min: string
//   price_max: string
// }
const priceSchema = schema.pick(['price_min', 'price_max'])
function AsideFilter({ categories, queryConfig }: Props) {
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_max: '',
      price_min: ''
    },
    resolver: yupResolver(priceSchema)
  })
  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })
  const valueForm = watch()
  // console.log('valueForm:', valueForm)
  return (
    <div className='mx-1 gap-2 py-5'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold capitalize', {
          'text-orange': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <ul>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          // const { category } = queryConfig
          //category : lấy từ url
          //categoryItem._id : lấy từ api
          //mỗi li ứng với một categoryItem._id (index cảu cái map) mỗi khi link vào
          return (
            <li key={categoryItem._id} className='py-2 pl-2'>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('relative px-2', {
                  'font-semibold text-orange': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='absolute top-1 left-[-10px] h-2 w-2 fill-orange'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <div className='my-4 h-[1px] bg-gray-300' />
      <Link to={path.home} className='mt-4 flex items-center font-bold uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='my-5'>Khoản giá</div>
      <form action='' className='mt-2' onSubmit={onSubmit}>
        <div className='flex items-start '>
          <Controller
            control={control}
            name='price_min'
            render={({ field }) => {
              return (
                <InputNumber
                  placeholder='from Đ'
                  type='text'
                  className='grow'
                  classNameInput='w-full rounded-sm border border-gray-300  p-1 outline-none focus:border-gray-500 focus:shadow-sm'
                  classNameError='hidden'
                  onChange={(event) => {
                    trigger('price_max')
                    field.onChange(event)
                  }}
                  value={field.value}
                  ref={field.ref}
                  // classNameError='hidden'
                />
              )
            }}
          />
          <div className=' mx-2 mt-2 shrink-0'> --- </div>
          <Controller
            control={control}
            name='price_max'
            render={({ field }) => {
              return (
                <InputNumber
                  placeholder='to Đ'
                  type='text'
                  className='grow'
                  classNameInput='w-full rounded-sm border border-gray-300  p-1 outline-none focus:border-gray-500 focus:shadow-sm'
                  onChange={(event) => {
                    trigger('price_min')
                    field.onChange(event)
                  }}
                  value={field.value}
                  classNameError='hidden '
                  ref={field.ref}
                />
              )
            }}
          />
        </div>
        <div className='my-2 min-h-[1.5rem] text-center text-sm font-bold text-red-800 '>
          {errors.price_max?.message}
        </div>
        <Button className='flex w-full items-center justify-center rounded-xl bg-orange p-2 text-sm uppercase text-white hover:bg-[red]'>
          Áp dụng
        </Button>
      </form>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='text-sm'>Đánh giá</div>
      {/* <ul className='my-3'>
        <li className='py-1 pl-2'>
          <Link to={path.home} className='flex items-center text-sm '>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className='p-1'>
                  helo
                </div>
              ))}
          </Link>
        </li>
      </ul> */}
      <RatingStars queryConfig={queryConfig} />
      <div className='my-4 h-[1px] bg-gray-300' />
      <Button className='w-full rounded-xl bg-orange py-2 px-2 text-sm uppercase text-white hover:bg-[red]'>
        Xóa tất cả
      </Button>
    </div>
  )
}

export default AsideFilter
