import React from 'react';
import LoginBtn from '../LoginBtn/LoginBtn';
import RegisterBtn from '../RegisterBtn/RegisterBtn';
import s from './AuthNav.module.css';

interface AuthNavProps {
  onLinkClick: () => void;
}

const AuthNav: React.FC<AuthNavProps> = ({ onLinkClick }) => {
  return (
    <nav className={s.authNav}>
      <LoginBtn onClick={onLinkClick} />
      <RegisterBtn onClick={onLinkClick} />
    </nav>
  );
};

export default AuthNav;