import { useLocation } from 'react-router-dom';
import Nav from '../Nav/Nav';
import AuthNav from '../AuthNav/AuthNav';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import useAuth from '../../hooks/useAuth';
import s from './MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const ICONS_SPRITE = '/icons.svg';

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { isLoggedIn } = useAuth();
  const { pathname } = useLocation();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <div
      className={`${s.backdrop} ${isOpen ? s.open : ''}`}
      onClick={onClose}
    >
      <div
        className={`
          ${s.drawer}
          ${isOpen ? s.openDrawer : ''}
          ${isAuthPage ? s.drawerAuthBg : s.drawerDefaultBg}
        `}
        onClick={e => e.stopPropagation()}
        role="menu"
      >
        <button
          type="button"
          className={s.closeBtn}
          onClick={onClose}
          aria-label="Close menu"
        >
          <svg className={s.iconCross}  width={24} height={24} aria-hidden="true" focusable="false">
            <use href={`${ICONS_SPRITE}#icon-cross`} />
          </svg>
        </button>

        <Nav onLinkClick={onClose} />

        {isLoggedIn ? (
          <LogOutBtn onLinkClick={onClose} />
        ) : (
          <AuthNav onLinkClick={onClose} />
        )}
      </div>
    </div>
  );
};

export default MobileMenu;