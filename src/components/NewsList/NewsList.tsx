import { useEffect, useState } from 'react';
import axios from 'axios';
import NewsItem from '../NewsItem/NewsItem';
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
}

const NewsList: React.FC<NewsListProps> = ({ keyword, currentPage, pageSize }) => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ results: News[]; total: number }>(
          '/news',
          {
            params: {
              keyword,
              page: currentPage,
              limit: pageSize,
            },
          }
        );
        setNews(response.data.results);
      } catch {
        // додати toast
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [keyword, currentPage, pageSize]);

  return (
    <ul className={s.newsList}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        news.map((item) => (
          <NewsItem
            key={item._id}
            title={item.title}
            description={item.text}
            date={item.date}
            image={item.imgUrl}
            url={item.url}
          />
        ))
      )}
    </ul>
  );
};

export default NewsList;