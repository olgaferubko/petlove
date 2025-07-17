import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import MobileMenu from '../MobileMenu/MobileMenu';
import UserBar from '../UserBar/UserBar';
import UserNav from '../UserNav/UserNav';
import useAuth from '../../hooks/useAuth';
import s from './Header.module.css';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/home';

  return (
    <header className={s.header}>
      <Logo />

      <div className={s.wrapper}>
        {isLoggedIn && <div className={s.userNavDesktop}><UserNav /></div>}

        {isLoggedIn && user && (
          <div className={s.userBarMobile}>
            <UserBar name={user.name} avatar={user.avatar} />
          </div>
        )}

        <button
          className={s.burger}
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg
            className={`${s.iconBurger} ${isHomePage ? s.iconBurgerHome : ''}`}
            width={32}
            height={32}
            aria-hidden="true"
          >
            <use href="/icons.svg#icon-menu" />
          </svg>
        </button>
      </div>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
};

export default Header;