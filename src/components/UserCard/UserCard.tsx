import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import EditUserBtn from '../EditUserBtn/EditUserBtn';
import UserBlock from '../UserBlock/UserBlock';
import PetsBlock from '../PetsBlock/PetsBlock';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import ModalEditUser from '../ModalEditUser/ModalEditUser';
import s from './UserCard.module.css';
import { RootState, AppDispatch } from '../../redux/store';
import { logoutUser } from '../../redux/auth/operations';

const UserCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) return null;

  const handleEditUser = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleLogOut = () => dispatch(logoutUser());

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
        <LogOutBtn onClick={handleLogOut} />
      </div>

      {isModalOpen && <ModalEditUser onClose={handleCloseModal} />}
    </div>
  );
};

export default UserCard;