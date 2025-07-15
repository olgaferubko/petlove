import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './redux/auth/hooks';
import { fetchCurrentUser } from './redux/auth/operations';
import { selectToken } from './redux/auth/selectors';

const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;