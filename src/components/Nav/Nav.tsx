import { NavLink, useLocation } from 'react-router-dom';
import s from './Nav.module.css';

interface NavProps {
  onLinkClick?: () => void;
}

const links = [
  { to: '/news', label: 'News' },
  { to: '/notices', label: 'Notices' },
  { to: '/friends', label: 'Our friends' },
];

const Nav: React.FC<NavProps> = ({ onLinkClick }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <nav aria-label="Main navigation">
      <ul className={s.list}>
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end
          >
            {({ isActive }) => (
              <li
                className={
                  isActive
                    ? `${isAuthPage ? s.itemAuth : s.item} ${isAuthPage ? s.activeAuth : s.active}`
                    : isAuthPage
                    ? s.itemAuth
                    : s.item
                }
              >
                <span className={s.link} onClick={onLinkClick}>
                  {label}
                </span>
              </li>
            )}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
