import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchPets } from '../../redux/pets/operations';
import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import { Filters } from '../../components/NoticesFilters/NoticesFilters';
import NoticesFilters from '../../components/NoticesFilters/NoticesFilters';
import NoticesList from '../../components/NoticesList/NoticesList';
import Pagination from '../../components/Pagination/Pagination';
import s from './NoticesPage.module.css';

const defaultFilters: Filters = {
  search: '',
  category: null,
  sex: null,
  species: null,
  city: null,
  sort: 'popular',
};

const NoticesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: notices, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.pets
  );

  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchPets({ filters: {
      search: filters.search,
      category: filters.category?.value,
      sex: filters.sex?.value,
      species: filters.species?.value,
      city: filters.city?.value,
      sort: filters.sort,
    }, page: currentPage }));
  }, [dispatch, filters, currentPage]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className={s.container}>
      <Header />
      <Title text="Find your favorite pet" />
      <NoticesFilters onFilterChange={handleFilterChange} />
      <NoticesList notices={notices} isLoading={isLoading} error={error} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default NoticesPage;