import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import EditUserBtn from '../EditUserBtn/EditUserBtn';
import UserBlock from '../UserBlock/UserBlock';
import PetsBlock from '../PetsBlock/PetsBlock';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import ModalEditUser from '../ModalEditUser/ModalEditUser';
import ModalApproveAction from '../ModalApproveAction/ModalApproveAction';
import s from './UserCard.module.css';
import { RootState, AppDispatch } from '../../redux/store';
import { logoutUser } from '../../redux/auth/operations';

const UserCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) return null;

  const handleEditUser = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
    setError(null);
  };

  const handleConfirmLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (err) {
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s.badge}>
          <span>User</span>
          <svg className={s.iconUser} width={18} height={18}>
            <use href="/icons.svg#icon-user" />
          </svg>
        </div>
        <EditUserBtn onClick={handleEditUser} />
      </div>

      <UserBlock />

      <div className={s.petsSection}>
        <PetsBlock />
      </div>

      <div className={s.logout}>
        <LogOutBtn onClick={openLogoutModal} color="beige" />
      </div>

      {isLogoutModalOpen && (
        <ModalApproveAction
          onConfirm={handleConfirmLogout}
          onCancel={closeLogoutModal}
          errorMessage={error || undefined}
        />
      )}

      {isEditModalOpen && <ModalEditUser onClose={handleCloseEditModal} />}
    </div>
  );
};

export default UserCard;