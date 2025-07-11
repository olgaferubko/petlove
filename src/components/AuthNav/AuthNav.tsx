import { NavLink } from 'react-router-dom';
import s from './AuthNav.module.css';

export interface AuthNavProps {
  onLinkClick?: () => void;
}

const links = [
  { to: '/register', label: 'Registration' },
  { to: '/login',    label: 'Log in'    },
];

const AuthNav: React.FC<AuthNavProps> = ({ onLinkClick }) => (
  <ul className={s.authNav}>
    {links.map(({ to, label }) => (
      <li key={to} className={s.item}>
        <NavLink
          to={to}
          className={({ isActive }) =>
            isActive ? `${s.link} ${s.active}` : s.link
          }
          onClick={onLinkClick}
        >
          {label}
        </NavLink>
      </li>
    ))}
  </ul>
);

export default AuthNav;