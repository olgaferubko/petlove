import { useLocation, useNavigate } from 'react-router-dom';
import s from './LoginBtn.module.css';

interface LoginBtnProps {
  onClick?: () => void;
  isModal?: boolean;
}

const LoginBtn: React.FC<LoginBtnProps> = ({ onClick, isModal }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const handleClick = () => {
    if (onClick) onClick();
    navigate('/login');
  };

  const btnClassName = isModal
  ? s.modalStyle
  : isAuthPage
  ? s.authPageStyle
  : s.defaultStyle;

  return (
    <button onClick={handleClick} className={btnClassName}>
      Log In
    </button>
  );
};

export default LoginBtn;