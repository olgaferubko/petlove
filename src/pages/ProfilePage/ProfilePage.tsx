import Header from '../../components/Header/Header';
import UserCard from '../../components/UserCard/UserCard';
import { MyNotices } from '../../components/MyNotices/MyNotices';

import s from './ProfilePage.module.css';

const ProfilePage: React.FC = () => {
  return (
    <main className={s.container}>
      <Header />
      <section className={s.content}>
        <UserCard />
        <MyNotices />
      </section>
    </main>
  );
};

export default ProfilePage;