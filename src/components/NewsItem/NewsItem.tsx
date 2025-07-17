import s from './NewsItem.module.css';

interface NewsItemProps {
  title: string;
  description: string;
  date: string;
  image: string;
  url: string;
}

const formatDate = (isoDate: string): string => {
  const d = new Date(isoDate);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const NewsItem: React.FC<NewsItemProps> = ({ title, description, date, image, url }) => {
  return (
    <li className={s.card}>
      <img src={image} alt={title} className={s.image} />
      <div className={s.content}>
        <h3 className={s.title}>{title}</h3>
        <p className={s.description}>{description}</p>
        <div className={s.info}>
          <p className={s.date}>{formatDate(date)}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={s.link}
          >
            Read more
          </a>
        </div>
      </div>
    </li>
  );
};

export default NewsItem;