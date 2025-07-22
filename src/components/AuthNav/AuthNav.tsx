import LoginBtn from '../LoginBtn/LoginBtn';
import RegisterBtn from '../RegisterBtn/RegisterBtn';
import s from './AuthNav.module.css';

interface AuthNavProps {
  onLinkClick: () => void;
  isModal?: boolean;
}

const AuthNav: React.FC<AuthNavProps> = ({ onLinkClick, isModal }) => {
  const navClass = isModal ? s.authNavModal : s.authNav;
  return (
    <nav className={navClass}>
      <LoginBtn onClick={onLinkClick} isModal={isModal} />
      <RegisterBtn onClick={onLinkClick} isModal={isModal} />
    </nav>
  );
};

export default AuthNav;