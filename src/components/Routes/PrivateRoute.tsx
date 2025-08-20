import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface PrivateRouteProps {
  component: React.FC;
}

const PrivateRoute = ({ component: Component }: PrivateRouteProps) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Component /> : <Navigate to="/login" replace state={{ from: location }} />;
};

export default PrivateRoute;