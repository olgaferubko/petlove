import React from 'react';
import { Link } from 'react-router-dom';
import s from './RegisterBtn.module.css';

interface RegisterBtnProps {
  onClick?: () => void;
}

const RegisterBtn: React.FC<RegisterBtnProps> = ({ onClick }) => (
  <Link to="/register" className={s.registerBtn} onClick={onClick}>
    Registration
  </Link>
);

export default RegisterBtn;