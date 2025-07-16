import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface RestrictedRouteProps {
  component: ReactElement;
}

const RestrictedRoute = ({ component: Component }: RestrictedRouteProps): ReactElement => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={location?.state || '/profile'} /> : Component;
};

export default RestrictedRoute;