import { NavLink } from 'react-router-dom';
import s from './Nav.module.css';

interface NavProps {
  onLinkClick?: () => void;
}

const links = [
  { to: '/news', label: 'News'},
  { to: '/notices', label: 'Notices'},
  { to: '/friends', label: 'Our friends'},
];

const Nav: React.FC<NavProps> = ({ onLinkClick }) => (
  <nav className={s.nav} aria-label="Main navigation">
    <ul className={s.list}>
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
  </nav>
);

export default Nav;
