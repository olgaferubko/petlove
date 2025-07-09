import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../validations/registrationFormValidation';
import { useAppDispatch } from '../../redux/auth/hooks';
import { registerUser } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegistrationForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<FormValues>({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await dispatch(
        registerUser({
          name: data.name.trim(),
          email: data.email.trim(),
          password: data.password,
        })
      ).unwrap();
      navigate('/profile');
    } catch (err: any) {
      toast.error(err);
    }
  };

  const renderToggle = (visible: boolean, onClick: () => void) => (
    <button type="button" onClick={onClick} className="toggle-btn">
      <svg width="20" height="20">
        <use xlinkHref={visible ? '#icon-eye' : '#icon-eye-off'} />
      </svg>
    </button>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={`field ${errors.name ? 'error' : touchedFields.name ? 'success' : ''}`}>
        <input placeholder="Name" {...register('name')} autoComplete="off" />
        {errors.name && <p className="field__message">{errors.name.message}</p>}
      </div>

      <div className={`field ${errors.email ? 'error' : touchedFields.email ? 'success' : ''}`}>
        <input placeholder="Email" {...register('email')} autoComplete="off" />
        {errors.email ? (
          <p className="field__message">{errors.email.message}</p>
        ) : touchedFields.email ? (
          <p className="field__message field__message--ok">Looks good</p>
        ) : null}
      </div>

      <div className={`field ${errors.password ? 'error' : touchedFields.password ? 'success' : ''}`}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          {...register('password')}
          autoComplete="new-password"
        />
        {renderToggle(showPassword, () => setShowPassword(v => !v))}
        {errors.password ? (
          <p className="field__message">{errors.password.message}</p>
        ) : touchedFields.password ? (
          <p className="field__message field__message--ok">Password is secure</p>
        ) : null}
      </div>

      <div className={`field ${errors.confirmPassword ? 'error' : touchedFields.confirmPassword ? 'success' : ''}`}>
        <input
          type={showConfirm ? 'text' : 'password'}
          placeholder="Confirm password"
          {...register('confirmPassword')}
          autoComplete="new-password"
        />
        {renderToggle(showConfirm, () => setShowConfirm(v => !v))}
        {errors.confirmPassword && (
          <p className="field__message">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button type="submit" disabled={!isValid} className="submit-btn">
        REGISTRATION
      </button>
    </form>
  );
}