import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './redux/auth/hooks';
import { fetchCurrentUser } from './redux/auth/operations';
import { selectToken, selectIsRefreshing } from './redux/auth/selectors';
import PrivateRoute from './components/Routes/PrivateRoute'
import RestrictedRoute from './components/Routes/RestrictedRoute';
import Loader from './components/Loader/Loader';

const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const NewsPage = lazy(() => import('./pages/NewsPage/NewsPage'));
const NoticesPage = lazy(() => import('./pages/NoticesPage/NoticesPage'))
const FriendsPage = lazy(() => import('./pages/FriendsPage/FriendsPage'))
const AddPage = lazy(() => import('./pages/AddPage/AddPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useSelector(selectToken);
  const isRefreshing = useSelector(selectIsRefreshing);

    useEffect(() => {
      if (token) {
        dispatch(fetchCurrentUser());
      }
    }, [dispatch, token]);

  if (isRefreshing) {
    return <Loader />; 
  }
  
  
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/login"
          element={
            <RestrictedRoute component={<LoginPage />} />
          }
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute component={<RegisterPage />} />
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute component={<ProfilePage />} />
          }
        />
        <Route
          path="/add-pet"
          element={
            <PrivateRoute component={<AddPage />} />
          }
        />
        <Route path="/home" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/friends" element={<FriendsPage />} />

        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;