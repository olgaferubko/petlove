import { useLocation, useNavigate } from 'react-router-dom';
import s from './LoginBtn.module.css';

interface LoginBtnProps {
  onClick?: () => void;
  isModal?: boolean;
  variant?: 'header' | 'mobileMenu';
}

const LoginBtn: React.FC<LoginBtnProps> = ({ onClick, isModal, variant = 'header' }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isHome = pathname === '/home';
  const isAuthPage = pathname === '/login' || pathname === '/register';

  const handleClick = () => {
    onClick?.();
    navigate('/login');
  };

  let btnClassName = s.defaultStyle;

  if (isModal) {
    btnClassName = s.modalStyle;
  } else if (variant === 'header') {
    btnClassName = isHome ? s.homeHeaderStyle : s.defaultStyle;
  } else if (variant === 'mobileMenu') {
    btnClassName = isAuthPage ? s.authPageStyle : s.defaultStyle;
  }

  return (
    <button onClick={handleClick} className={btnClassName}>
      Log In
    </button>
  );
};

export default LoginBtn;