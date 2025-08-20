import { useEffect, useState } from 'react';
import axios from 'axios';
import NewsItem from '../NewsItem/NewsItem';
import BaseLoader from '../BaseLoader/BaseLoader';
import s from './NewsList.module.css';

interface News {
  _id: string;
  title: string;
  text: string;
  date: string;
  imgUrl: string;
  url: string;
}

interface NewsListProps {
  keyword: string;
  currentPage: number;
  pageSize: number;
  onTotalChange: (totalPages: number) => void;
}

interface NewsResponse {
  page: number;
  perPage: number;
  totalPages: number;
  results: News[];
}

const NewsList: React.FC<NewsListProps> = ({
  keyword,
  currentPage,
  pageSize,
  onTotalChange,
}) => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<NewsResponse>('/news', {
          params: { keyword, page: currentPage, limit: pageSize },
        });
        setNews(data.results);
        onTotalChange(data.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [keyword, currentPage, pageSize, onTotalChange]);

  if (loading) return <BaseLoader />;

  return (
    <ul className={s.newsList}>
      {news.map(item => (
        <NewsItem
          key={item._id}
          title={item.title}
          description={item.text}
          date={item.date}
          image={item.imgUrl}
          url={item.url}
        />
      ))}
    </ul>
  );
};

export default NewsList;