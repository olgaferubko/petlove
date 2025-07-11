import { Link } from 'react-router-dom';
import s from './Logo.module.css';

const Logo: React.FC = () => {
  return (
    <Link to="/" className={s.logo}>
      <span>petl</span>
      <svg
        className={s.heartIcon}
        width={17}
        height={17}
        aria-hidden="true"
        focusable="false"
      >
        <use href="/icons.svg#icon-heart-circle" />
      </svg>
      <span>ve</span>
    </Link>
  );
};

export default Logo;