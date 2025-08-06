import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import FriendsList from '../../components/FriendsList/FriendsList';
import s from './FriendsPage.module.css';

const FriendsPage: React.FC = () => {
  return (
    <main className={s.container}>
      <Header />
        <div className={s.friendsWrapper}>
          <Title text="Our friends" />
          <FriendsList />
        </div>
    </main>
  );
};

export default FriendsPage;