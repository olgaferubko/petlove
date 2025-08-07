import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import s from './UserBlock.module.css';

const UserBlock = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return null;

  const { name, email, phone, avatar } = user;

  const phoneDigits = phone?.startsWith('+380') ? phone.slice(4) : phone || '';
  const formatPhone = (digits: string) => {
    const clean = digits.replace(/\D/g, '').slice(-9);
    if (clean.length < 9) return clean;
    return ` ${clean.slice(0, 2)} ${clean.slice(2, 5)} ${clean.slice(5, 7)} ${clean.slice(7, 9)}`;
  };

  return (
    <div className={s.container}>
      <div className={`${s.avatarContainer} ${avatar ? s.filledAvatarContainer : ''}`}>
        {avatar ? (
          <img src={avatar} alt="User avatar" className={s.avatar} />
        ) : (
          <div className={s.avatarPlaceholder}>
            <svg className={s.iconUser}>
              <use href="/icons.svg#icon-user" />
            </svg>
          </div>
        )}
      </div>

      <div className={s.wrapperInfo}>
        <h3 className={s.sectionTitle}>My information</h3>
        <ul className={s.infoList}>
          <li className={s.row}>
            <input className={`${s.input} ${name && s.filled}`} type="text" value={name} readOnly />
            <input className={`${s.input} ${email && s.filled}`} type="email" value={email} readOnly />
          </li>
          <li className={`${s.phoneWrapper} ${phone && s.filled}`}>
            <span className={s.prefix}>+380</span>
            <input className={s.inputPhone} type="tel" value={formatPhone(phoneDigits)} readOnly />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserBlock;