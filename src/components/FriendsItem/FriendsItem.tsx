import s from './FriendsItem.module.css';

interface WorkDay {
  _id: string;
  isOpen: boolean;
  from?: string;
  to?: string;
}

interface Friend {
  _id: string;
  title: string;
  url: string;
  addressUrl: string;
  imageUrl: string;
  address?: string;
  workDays?: WorkDay[];
  phone?: string;
  email: string;
}

const FriendsItem: React.FC<{ friend: Friend }> = ({ friend }) => {
  const renderWorkTime = () => {
    if (!Array.isArray(friend.workDays) || friend.workDays.length === 0) {
      return <p className={s.tag}>Day and night</p>;
    }

    const openDays = friend.workDays.filter(day => day.isOpen && day.from && day.to);
    if (openDays.length === 0) {
      return <p className={s.tag}>Day and night</p>;
    }

    const { from, to } = openDays[0];
    return (
      <p className={s.tag}>
        {from} - {to}
      </p>
    );
  };

  return (
    <li className={s.card}>
      <img src={friend.imageUrl} alt={friend.title} className={s.logo} />

        <div>
         <h3 className={s.title}>
            <a href={friend.url} target="_blank" rel="noopener noreferrer">
              {friend.title}
            </a>
          </h3>
          {renderWorkTime()}


        <ul className={s.contacts}>
            <li>
                <span className={s.contactsItem}>Email:</span>{' '}
                {friend.email ? (
                <a href={`mailto:${friend.email}`} className={s.link}>
                    {friend.email}
                </a>
                ) : (
                <span className={s.disabled}>website only</span>
                )}
            </li>
            <li>
                <span className={s.contactsItem}>Address:</span>{' '}
                {friend.address && friend.addressUrl ? (
                <a href={friend.addressUrl} target="_blank" rel="noopener noreferrer" className={s.link}>
                    {friend.address}
                </a>
                ) : (
                <span className={s.disabled}>website only</span>
                )}
            </li>
            <li>
            <span className={s.contactsItem}>Phone:</span>{' '}
            {friend.phone ? (
              <a href={`tel:${friend.phone}`} className={s.link}>
                {friend.phone}
              </a>
            ) : (
              <span className={s.disabled}>email only</span>
            )}
          </li>
        </ul>
      </div>
    </li>
  );
};

export default FriendsItem;