import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectIsRefreshing,
  selectToken,
  selectUser,
  selectUserName,
} from '../redux/auth/selectors';

const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const userName = useSelector(selectUserName);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    userName,
    token,
  };
};

export default useAuth;