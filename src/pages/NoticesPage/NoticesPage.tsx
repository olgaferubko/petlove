import { useEffect, useState, useMemo } from 'react';
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

const PAGE_LIMIT = 6;
const CLIENT_FETCH_LIMIT = 120;
const isClientSort = (s: Filters['sort']) =>
  s === 'unpopular' || s === 'cheap' || s === 'popular';

const NoticesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: notices, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.pets
  );

  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    if (isClientSort(filters.sort)) return;
    dispatch(
      fetchPets({
        filters: {
          search: filters.search,
          category: filters.category?.value,
          sex: filters.sex?.value as any,
          species: filters.species?.value,
          city: filters.city?.value,
          sort: filters.sort ?? '',
        },
        page: currentPage,
        limit: PAGE_LIMIT,
        clientMode: false,
      })
    );
  }, [dispatch, currentPage, filters]);

  useEffect(() => {
    if (!isClientSort(filters.sort)) return;
    dispatch(
      fetchPets({
        filters: {
          search: filters.search,
          category: filters.category?.value,
          sex: filters.sex?.value as any,
          species: filters.species?.value,
          city: filters.city?.value,
          sort: filters.sort ?? '',
        },
        page: 1,
        limit: CLIENT_FETCH_LIMIT,
        clientMode: true,
      })
    );
  }, [dispatch, filters]);

  const displayedNotices = useMemo(() => {
    if (!isClientSort(filters.sort)) return notices;

    const arr = [...notices];
    const priceNum = (x: any) => (x.price === 'free' ? 0 : Number(x.price ?? 0));
    const cmpById = (a: any, b: any) => String(a._id).localeCompare(String(b._id));

    if (filters.sort === 'cheap') {
      arr.sort((a, b) => {
        const d = priceNum(a) - priceNum(b);
        return d || cmpById(a, b);
      });
    } else if (filters.sort === 'unpopular') {
      arr.sort((a, b) => {
        const d = Number(a.popularity ?? 0) - Number(b.popularity ?? 0);
        return d || cmpById(a, b);
      });
    } else if (filters.sort === 'popular') {
      arr.sort((a, b) => {
        const d = Number(b.popularity ?? 0) - Number(a.popularity ?? 0);
        return d || cmpById(a, b);
      });
    }

    const start = (currentPage - 1) * PAGE_LIMIT;
    return arr.slice(start, start + PAGE_LIMIT);
  }, [notices, filters.sort, currentPage]);

  const effectiveTotalPages = useMemo(() => {
    if (!isClientSort(filters.sort)) return totalPages;
    return Math.max(1, Math.ceil(notices.length / PAGE_LIMIT));
  }, [filters.sort, notices.length, totalPages]);

  return (
    <main className={s.container}>
      <Header />
      <div className={s.noticesWrapper}>
        <Title text="Find your favorite pet" />
        <div className={s.filters}>
          <NoticesFilters
            onFilterChange={(nf) => {
              setFilters(nf);
              setCurrentPage(1);
            }}
          />
        </div>
        <NoticesList notices={displayedNotices} isLoading={isLoading} error={error} />
        <Pagination
          currentPage={currentPage}
          totalPages={effectiveTotalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </main>
  );
};

export default NoticesPage;