import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import MobileMenu from '../MobileMenu/MobileMenu';
import UserBar from '../UserBar/UserBar';
import UserNav from '../UserNav/UserNav';
import AuthNav from '../AuthNav/AuthNav';
import useAuth from '../../hooks/useAuth';
import Nav from '../Nav/Nav';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import s from './Header.module.css';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();
  const width = useWindowWidth();
  const isHomePage = location.pathname === '/home';

  const isMobile = width < 768;
  const isTabletOrDesktop = width >= 768;

  return (
    <header className={s.header}>
      <Logo />
      <div className={s.navDesktop}><Nav /></div>

      <div className={s.wrapper}>
        {isMobile && isLoggedIn && user && (
          <div className={s.userBarMobile}>
            <UserBar />
          </div>
        )}

        {isTabletOrDesktop && (
          <div className={s.userNavDesktop}>
            {isLoggedIn ? <UserNav /> : <div className={s.authNavWrapper}><AuthNav onLinkClick={() => setMenuOpen(false)} /></div>} 
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