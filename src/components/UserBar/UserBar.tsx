import { Link } from 'react-router-dom';
import s from './UserBar.module.css';

interface UserBarProps {
  name: string;
  avatar?: string | null;
}

const SPRITE_PATH = '/icons.svg';

const UserBar: React.FC<UserBarProps> = ({ name, avatar }) => {
  const hasAvatar = Boolean(avatar);

  return (
    <Link to="/profile" className={s.userBar}>
      <div className={s.avatarWrapper}>
        {hasAvatar ? (
          <img
            src={avatar!}
            alt={`${name} avatar`}
            className={s.avatarImage}
          />
        ) : (
          <svg
            className={s.avatarIcon}
            width={40}
            height={40}
            aria-hidden="true"
            focusable="false"
          >
            <use href={`${SPRITE_PATH}#icon-user`} />
          </svg>
        )}
      </div>
      <span className={s.name}>{name}</span>
    </Link>
  );
};

export default UserBar;
