import { useEffect, useState } from 'react';
import FriendsItem from '../FriendsItem/FriendsItem';
import BaseLoader from '../BaseLoader/BaseLoader'; 
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://petlove.b.goit.study/api/friends/');
        const data = await res.json();
        setFriends(data);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) return <BaseLoader />;

  return (
    <ul className={s.list}>
      {friends.map(friend => (
        <FriendsItem key={friend._id} friend={friend} />
      ))}
    </ul>
  );
};

export default FriendsList;