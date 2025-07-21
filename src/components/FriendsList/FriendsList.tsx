import { useEffect, useState } from 'react';
import FriendsItem from '../FriendsItem/FriendsItem';
import s from './FriendsList.module.css';

interface Friend {
  _id: string;
  title: string;
  url: string;
  addressUrl: string;
  imageUrl: string;
  address: string;
  workDays: {
    _id: string;
    isOpen: boolean;
    from?: string;
    to?: string;
  }[];
  phone: string;
  email: string;
}

const FriendsList: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    fetch('https://petlove.b.goit.study/api/friends/')
      .then(res => res.json())
      .then(data => setFriends(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <ul className={s.list}>
      {friends.map(friend => (
        <FriendsItem key={friend._id} friend={friend} />
      ))}
    </ul>
  );
};

export default FriendsList;
