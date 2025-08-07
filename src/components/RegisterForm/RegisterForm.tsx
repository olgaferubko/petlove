import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from '../../validations/registrationFormValidation'
import { useAppDispatch } from '../../redux/auth/hooks'
import { registerUser } from '../../redux/auth/operations'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import s from './RegisterForm.module.css'

interface FormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const ICONS_SPRITE = '/icons.svg'

const RegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

const {
  register,
  handleSubmit,
  watch,
  formState: { errors, isSubmitting }
} = useForm<FormValues>({
  resolver: yupResolver(registerSchema),
  mode: 'onSubmit',
})

  const watchedPassword = watch('password', '')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const onSubmit = async (data: FormValues) => {
    try {
      await dispatch(
        registerUser({
          name: data.name.trim(),
          email: data.email.trim(),
          password: data.password,
        })
      ).unwrap()
      toast.success('Registration successful!')
      navigate('/profile', { replace: true })
    } catch (err: any) {
      toast.error(err ?? 'Registration failed')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form} noValidate>
      <div className={s.wrapper}>

        <label className={`${s.field} ${errors.name ? s.invalid : ''}`}>
          <input
            type="text"
            placeholder="Name"
            {...register('name')}
            className={s.input}
          />
          {errors.name && (
            <svg className={s.iconError} width={18} height={18}>
              <use href={`${ICONS_SPRITE}#icon-x`} />
            </svg>
          )}
        </label>
        {errors.name && <p className={s.error}>{errors.name.message}</p>}


        <label className={`${s.field} ${errors.email ? s.invalid : ''}`}>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className={s.input}
          />
          {errors.email && (
            <svg className={s.iconError} width={18} height={18}>
              <use href={`${ICONS_SPRITE}#icon-x`} />
            </svg>
          )}
        </label>
        {errors.email && <p className={s.error}>{errors.email.message}</p>}


        <label className={`${s.field} ${errors.password ? s.invalid : watchedPassword ? s.valid : ''}`}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            {...register('password')}
            className={s.input}
            autoComplete="new-password"
          />
          <div className={s.iconWrapper}>
            {watchedPassword && !errors.password && (
              <svg className={s.iconCheck} width={18} height={18}>
                <use href={`${ICONS_SPRITE}#icon-check`} />
              </svg>
            )}
            <button
              type="button"
              className={s.toggleBtn}
              onClick={() => setShowPassword(v => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <svg className={s.iconEye} width={18} height={18}>
                <use href={`${ICONS_SPRITE}#icon-eye-off`} />
              </svg>
            </button>
          </div>
        </label>
        {errors.password ? (
          <p className={s.error}>{errors.password.message}</p>
        ) : watchedPassword ? (
          <p className={s.success}>Password is secure</p>
        ) : null}

        <label className={`${s.field} ${errors.confirmPassword ? s.invalid : ''}`}>
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Confirm password"
            {...register('confirmPassword')}
            className={s.input}
            autoComplete="new-password"
          />
          <div className={s.iconWrapper}>
            <button
              type="button"
              className={s.toggleBtn}
              onClick={() => setShowConfirm(v => !v)}
              aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
            >
              <svg className={s.iconEye} width={18} height={18}>
                <use href={`${ICONS_SPRITE}#icon-eye-off`} />
              </svg>
            </button>
          </div>
        </label>
        {errors.confirmPassword && (
          <p className={s.error}>{errors.confirmPassword.message}</p>
        )}

      </div>

      <button type="submit" className={s.submitBtn} disabled={isSubmitting}>
        Registration
      </button>
    </form>
  )
}

export default RegistrationForm