import { useState } from 'react';
import Logo from '../Logo/Logo';
import UserBar from '../UserBar/UserBar';
import MobileMenu from '../MobileMenu/MobileMenu';
import useAuth from '../../hooks/useAuth';
import s from './Header.module.css';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, user } = useAuth();

  return (
    <header className={s.header}>
      <Logo />

      {isLoggedIn && user && (
        <UserBar
          name={user.name}
          avatar={user.avatar ?? null}
        />
      )}

      <button
        className={s.burger}
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
      >
        <svg className={s.iconBurger} width={32} height={32} aria-hidden="true">
          <use xlinkHref="/icons.svg#icon-menu" />
        </svg>
      </button>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  );
};

export default Header;