import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../../validations/loginFormValidation'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppDispatch } from '../../redux/auth/hooks'
import { loginUser } from '../../redux/auth/operations'
import { selectAuthLoading, selectAuthError } from '../../redux/auth/selectors'
import { useSelector } from 'react-redux'
import s from './LoginForm.module.css'

interface FormValues {
  email: string
  password: string
}

const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoading = useSelector(selectAuthLoading)
    const authError = useSelector(selectAuthError)

    const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
    })

  useEffect(() => {
    if (authError) {
      toast.error(authError)
    }
  }, [authError])

  const onSubmit = async (data: FormValues) => {
    try {
      await dispatch(loginUser(data)).unwrap()
      toast.success('Successfully logged in!')
      navigate('/profile', { replace: true })
    } catch (err: any) {
      toast.error(err ?? 'Login failed')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form} noValidate>
      <label className={s.field}>
        <input
          type="email"
          placeholder="Email"
          {...register('email')}
          className={`${s.input} ${errors.email ? s.invalid : ''}`}
          disabled={isLoading}
        />
      </label>
      {errors.email && <p className={s.error}>{errors.email.message}</p>}

      <label className={s.field}>
        <input
          type="password"
          placeholder="Password"
          {...register('password')}
          className={`${s.input} ${errors.password ? s.invalid : ''}`}
          disabled={isLoading}
        />
      </label>
      {errors.password && <p className={s.error}>{errors.password.message}</p>}

      <button type="submit" className={s.submitBtn} disabled={isLoading}>
        {isLoading ? 'Logging in…' : 'Log In'}
      </button>
    </form>
  )
}

export default LoginForm
