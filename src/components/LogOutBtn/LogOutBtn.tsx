import s from './LogOutBtn.module.css';

interface LogOutBtnProps {
  onClick: () => void;
}

const LogOutBtn: React.FC<LogOutBtnProps> = ({ onClick }) => (
  <button
    type="button"
    className={s.logoutBtn}
    onClick={onClick}
    aria-label="Log out"
  >
    LOG OUT
  </button>
);

export default LogOutBtn;