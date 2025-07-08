import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface PrivateRouteProps {
  component: ReactElement;
}

const PrivateRoute = ({ component: Component }: PrivateRouteProps): ReactElement => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? Component : <Navigate to="/login" replace state={location} />;
};

export default PrivateRoute;