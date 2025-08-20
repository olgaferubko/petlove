import LoginBtn from '../LoginBtn/LoginBtn';
import RegisterBtn from '../RegisterBtn/RegisterBtn';
import s from './AuthNav.module.css';

interface AuthNavProps {
  onLinkClick: () => void;
  isModal?: boolean;
  variant?: 'header' | 'mobileMenu';
}

const AuthNav: React.FC<AuthNavProps> = ({ onLinkClick, isModal, variant = 'header' }) => {
  const navClass = isModal ? s.authNavModal : s.authNav;
  return (
    <nav className={navClass}>
      <LoginBtn onClick={onLinkClick} isModal={isModal} variant={variant} />
      <RegisterBtn onClick={onLinkClick} isModal={isModal} />
    </nav>
  );
};

export default AuthNav;