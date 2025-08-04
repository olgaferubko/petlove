import { Link, useLocation } from 'react-router-dom';
import s from './Logo.module.css';

const Logo: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/home';

  return (
    <Link
      to="/home"
      className={`${s.logo} ${isHomePage ? s.logoHome : ''}`}
    >
      <span>petl</span>
      <div className={s.iconWrapper}>
        <svg
          className={`${s.heartIcon} ${isHomePage ? s.heartIconHome : ''}`}
          aria-hidden="true"
          focusable="false"
        >
          <use href="/icons.svg#icon-heart-circle" />
        </svg>
      </div>
      <span>ve</span>
    </Link>
  );
};

export default Logo;