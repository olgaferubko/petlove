import { useState } from 'react';
import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import SearchField from '../../components/SearchField/SearchField';
import NewsList from '../../components/NewsList/NewsList';
import Pagination from '../../components/Pagination/Pagination';
import s from './NewsPage.module.css';

const NewsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <main className={s.container}>
      <Header />
      <Title text="News" />
      <SearchField onSearch={handleSearch} placeholder="Search" />
      <NewsList
        keyword={searchQuery}
        currentPage={currentPage}
        pageSize={pageSize}
        onTotalChange={setTotalPages}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  );
};

export default NewsPage;