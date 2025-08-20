import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface RestrictedRouteProps {
  component: React.FC;
}

const RestrictedRoute = ({ component: Component }: RestrictedRouteProps) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  return isLoggedIn
    ? <Navigate to={(location.state as any)?.from?.pathname || '/profile'} replace />
    : <Component />;
};

export default RestrictedRoute;