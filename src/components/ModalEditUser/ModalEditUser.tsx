import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { updateUser, fetchCurrentUser } from '../../redux/auth/operations';
import { toast } from 'react-hot-toast';
import { editUserSchema, FormData } from '../../validations/validationEditSchema';
import s from './ModalEditUser.module.css';

interface ModalEditUserProps {
  onClose: () => void;
}

const ModalEditUser = ({ onClose }: ModalEditUserProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return null;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(editUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      avatar: user.avatar || '',
      phone: user.phone?.replace(/^\+380/, '') || '',
    },
  });

  const avatarPreview = watch('avatar');
  const phoneRaw = watch('phone');
  const phoneDigits = phoneRaw.replace(/\D/g, '').slice(0, 9);
  const formattedPhone = phoneDigits
    ? `${phoneDigits.slice(0, 2)} ${phoneDigits.slice(2, 5)} ${phoneDigits.slice(5, 7)} ${phoneDigits.slice(7)}`
    : '';

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const payload = {
      name: data.name.trim(),
      email: data.email.trim(),
      avatar: data.avatar.trim(),
      phone: `+380${data.phone.replace(/\D/g, '')}`,
    };

    try {
      await dispatch(updateUser(payload)).unwrap();
      await dispatch(fetchCurrentUser());
      toast.success('User updated successfully');
      onClose();
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update user');
    }
  };

  return (
    <div className={s.backdrop}>
      <div className={s.modal}>
        <button className={s.closeBtn} onClick={onClose}>
          <svg className={s.closeIcon} width={24} height={24}>
            <use href="/icons.svg#icon-x" />
          </svg>
        </button>

        <h3 className={s.title}>Edit information</h3>

        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={s.avatarWrapper}>
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" className={s.avatarImage} />
            ) : (
              <svg className={s.iconUser} width={40} height={40}>
                <use href="/icons.svg#icon-user" />
              </svg>
            )}
          </div>

          <div className={s.inputGroup}>
              <input
                {...register('avatar')}
                type="text"
                placeholder="Enter image URL"
                className={`${s.inputAvatar} ${watch('avatar') ? s.filled : ''}`}
                onChange={(e) => {
                  setValue('avatar', e.target.value, { shouldValidate: true });
                }}
              />
              <div className={s.uploadStatic}>
              Upload photo
                <svg className={s.uploadIcon} width={18} height={18}>
                  <use href="/icons.svg#icon-upload" />
                </svg>
              </div>
              {errors.avatar && <p className={s.error}>{errors.avatar.message}</p>}
            </div>

          <div className={s.infoWrapper}>
            <input
              {...register('name')}
              className={`${s.inputInfo} ${watch('name') ? s.filled : ''}`}
              placeholder="Name"
            />
            {errors.name && <p className={s.error}>{errors.name.message}</p>}

            <input
              {...register('email')}
              className={`${s.inputInfo} ${watch('email') ? s.filled : ''}`}
              placeholder="Email"
            />
            {errors.email && <p className={s.error}>{errors.email.message}</p>}

            <div className={`${s.phoneWrapper} ${phoneDigits ? s.filled : ''}`}>
              <span className={s.prefix}>+380</span>
              <input
                type="text"
                className={s.inputPhone}
                inputMode="numeric"
                value={formattedPhone}
                onChange={(e) => {
                  const clean = e.target.value.replace(/\D/g, '').slice(0, 9);
                  setValue('phone', clean, { shouldValidate: true });
                }}
                placeholder=""
              />
              {errors.phone && <p className={s.error}>{errors.phone.message}</p>}
            </div>
          </div>

          <button type="submit" className={s.submitBtn} disabled={isSubmitting}>
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalEditUser;