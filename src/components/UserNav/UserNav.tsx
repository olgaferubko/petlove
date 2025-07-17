import { useState } from 'react';
import UserBar from '../UserBar/UserBar';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import ModalApproveAction from '../ModalApproveAction/ModalApproveAction';
import useAuth from '../../hooks/useAuth';
import { useAppDispatch } from '../../redux/auth/hooks';
import { logoutUser } from '../../redux/auth/operations';

import s from './UserNav.module.css';

const UserNav: React.FC = () => {
  const { isLoggedIn, user } = useAuth();
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setError(null);
  };

  const handleConfirmLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (err) {
      setError('Something went wrong. Try again.');
    }
  };

  if (!isLoggedIn || !user) return null;

  return (
      <div className={s.userNav}>
        <LogOutBtn onClick={openModal} />
        <UserBar name={user.name} avatar={user.avatar} />
      

        {isModalOpen && (
            <ModalApproveAction
            onConfirm={handleConfirmLogout}
            onCancel={closeModal}
            errorMessage={error || undefined}
            />
        )}
    </div>
  );
};

export default UserNav;
