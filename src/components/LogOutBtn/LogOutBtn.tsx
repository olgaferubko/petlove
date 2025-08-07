import s from './LogOutBtn.module.css';

interface LogOutBtnProps {
  onClick: () => void;
  color?: 'orange' | 'beige';
}

const LogOutBtn: React.FC<LogOutBtnProps> = ({ onClick, color }) => {
  const colorClass = color === 'orange' ? s.orange :
                     color === 'beige' ? s.beige : '';

  return (
    <button
      type="button"
      className={`${s.logoutBtn} ${colorClass}`}
      onClick={onClick}
      aria-label="Log out"
    >
      LOG OUT
    </button>
  );
};

export default LogOutBtn;