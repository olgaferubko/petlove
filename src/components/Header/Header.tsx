import { useState } from 'react';
import Logo from '../Logo/Logo';
import MobileMenu from '../MobileMenu/MobileMenu';
import UserBar from '../UserBar/UserBar';
import useAuth from '../../hooks/useAuth';
import s from './Header.module.css';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, user } = useAuth();
console.log('isLoggedIn:', isLoggedIn);
console.log('user:', user);
  return (
    <header className={s.header}>
      <Logo />
      <div>
      {isLoggedIn && user ? (
        <UserBar name={user.name} avatar={user.avatar} />
      ) : null}
      <button
        className={s.burger}
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
      >
        <svg className={s.iconBurger} width={32} height={32} aria-hidden="true">
          <use href="/icons.svg#icon-menu" />
        </svg>
      </button>
      </div>


      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
};

export default Header;
