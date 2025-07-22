import { Link } from 'react-router-dom';
import s from './RegisterBtn.module.css';

interface RegisterBtnProps {
  onClick?: () => void;
  isModal?: boolean;
}

const RegisterBtn: React.FC<RegisterBtnProps> = ({ onClick, isModal }) => (
  <Link to="/register" className={isModal ? s.modalBtn : s.defaultBtn} onClick={onClick}>
    Registration
  </Link>
);

export default RegisterBtn;