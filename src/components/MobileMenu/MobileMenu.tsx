import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';
import AuthNav from '../AuthNav/AuthNav';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import useAuth from '../../hooks/useAuth';
import ModalApproveAction from '../ModalApproveAction/ModalApproveAction';
import { useAppDispatch } from '../../redux/auth/hooks';
import { logoutUser } from '../../redux/auth/operations';
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

  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const openModal = () => setModalOpen(true);

  const closeModal = () => {
    setError(null);
    setModalOpen(false);
  };

 const onConfirmLogOut = async () => {
  try {
    const resultAction = await dispatch(logoutUser());

    if (logoutUser.rejected.match(resultAction)) {
      setError(resultAction.payload || 'Logout failed');
      return;
    }

    localStorage.clear();
    closeModal();
    onClose();
    navigate('/');
  } catch {
    setError('Unexpected error during logout');
  }
};

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
          <svg
            className={`${s.iconCross} ${isAuthPage ? s.whiteIcon : s.blackIcon}`}
            aria-hidden="true"
            focusable="false"
          >
            <use href={`${ICONS_SPRITE}#icon-x`} />
          </svg>
        </button>

        <Nav onLinkClick={onClose} />

        {isLoggedIn ? (
          <LogOutBtn onClick={openModal} color="beige" />
        ) : (
          <AuthNav onLinkClick={onClose} />
        )}
      </div>

      {isModalOpen && (
        <ModalApproveAction
          onConfirm={onConfirmLogOut}
          onCancel={closeModal}
          errorMessage={error || undefined}
        />
      )}
    </div>
  );
};

export default MobileMenu;