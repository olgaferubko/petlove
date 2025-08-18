import NoticesItem from '../NoticesItem/NoticesItem';
import s from './NoticesList.module.css';

interface Notice {
  _id: string;
  imgURL: string;
  title: string;
  popularity: number;
  name: string;
  birthday: string;
  sex: string;
  species: string;
  category: string;
  comment: string;
  price: string;
  isFavorite: boolean;
}

type NoticesListProps = {
  notices: Notice[];
  isLoading?: boolean;
  error?: string | null;
};

const NoticesList: React.FC<NoticesListProps> = ({ notices, isLoading, error }) => {
  if (isLoading) return <p className={s.status}>Loading notices...</p>;
  if (error) return <p className={s.status}>Error: {error}</p>;
  if (notices.length === 0) return <p className={s.status}>Oops, no notices found!</p>;

  return (
    <ul className={s.list}>
      {notices.map(notice => (
        <NoticesItem key={notice._id} notice={notice} />
      ))}
    </ul>
  );
};

export default NoticesList;