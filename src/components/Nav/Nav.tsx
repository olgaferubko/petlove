import { NavLink, useLocation } from 'react-router-dom';
import s from './Nav.module.css';
import { useWindowWidth } from '../../hooks/useWindowWidth';

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
  const width = useWindowWidth();

  const pathname = location.pathname;
  const isDesktop = width >= 1280;

  let itemClass = s.item;

  if (pathname === '/home') {
    itemClass = isDesktop ? s.itemAuth : s.item;
  } else if (pathname === '/login' || pathname === '/register') {
    itemClass = isDesktop ? s.item : s.itemAuth;
  } else {
    itemClass = s.item;
  }

  return (
    <nav aria-label="Main navigation">
      <ul className={s.list}>
        {links.map(({ to, label }) => (
          <NavLink key={to} to={to} end>
            {({ isActive }) => (
              <li className={`${itemClass} ${isActive ? s.active : ''}`}>
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