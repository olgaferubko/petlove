import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import s from './LoginBtn.module.css';

interface LoginBtnProps {
  onClick?: () => void;
}

const LoginBtn: React.FC<LoginBtnProps> = ({ onClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const handleClick = () => {
    if (onClick) onClick();
    navigate('/login');
  };

  const btnClassName = isAuthPage ? s.authPageStyle : s.defaultStyle;

  return (
    <button onClick={handleClick} className={btnClassName}>
      Login
    </button>
  );
};

export default LoginBtn;