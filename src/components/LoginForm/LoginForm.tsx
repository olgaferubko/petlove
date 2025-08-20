import { useEffect, useState } from 'react'
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

const ICONS_SPRITE = '/icons.svg'

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLoading = useSelector(selectAuthLoading)
  const authError = useSelector(selectAuthError)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange'
  })

  const watchedEmail = watch('email', '')
  const watchedPassword = watch('password', '')

  const [showPassword, setShowPassword] = useState(false)


  const onSubmit = async (data: FormValues) => {
    try {
      await dispatch(loginUser(data)).unwrap()
      toast.success('Successfully logged in!')
      navigate('/profile', { replace: true })
    } catch (err: any) {
      toast.error(err?.message || 'Login failed')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form} noValidate>
      <div className={s.wrapper}>
        <label className={`${s.field} ${errors.email ? s.invalid : ''}`}>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className={s.input}
            disabled={isLoading}
          />
          {watchedEmail && errors.email && (
            <svg className={s.iconError} aria-hidden="true">
              <use href={`${ICONS_SPRITE}#icon-x`} />
            </svg>
          )}
        </label>
        {errors.email && <p className={s.error}>{errors.email.message}</p>}

        <label
          className={`${s.field} ${
            errors.password ? s.invalid : watchedPassword ? s.valid : ''
          }`}
        >
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            {...register('password')}
            className={s.input}
            disabled={isLoading}
          />
          <div className={s.iconWrapper}>
            {watchedPassword && !errors.password && (
              <svg className={s.iconCheck} aria-hidden="true">
                <use href={`${ICONS_SPRITE}#icon-check`} />
              </svg>
            )}

            <button
              type="button"
              className={s.toggleBtn}
              onClick={() => setShowPassword(v => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <svg
                className={showPassword ? s.iconEye : s.iconEyeOff}
                aria-hidden="true"
              >
                <use
                  href={`${ICONS_SPRITE}${
                    showPassword ? '#icon-eye' : '#icon-eye-off'
                  }`}
                />
              </svg>
            </button>
          </div>
        </label>
        {errors.password ? (
          <p className={s.error}>{errors.password.message}</p>
        ) : watchedPassword ? (
          <p className={s.success}>Password is secure</p>
        ) : null}
      </div>

      <button type="submit" className={s.submitBtn} disabled={isLoading}>
        {isLoading ? 'Logging in…' : 'Log in'}
      </button>
    </form>
  )
}

export default LoginForm