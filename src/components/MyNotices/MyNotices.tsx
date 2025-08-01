import { useState, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { deleteFavoriteFromBackend } from '../../redux/pets/operations';
import { Pet } from '../../redux/pets/pets-types';
import NoticesItem from '../NoticesItem/NoticesItem';
import s from './MyNotices.module.css';
import clsx from 'clsx';

const tabs = [
  { label: 'My favorite pets', value: 'favorites' },
  { label: 'Viewed', value: 'viewed' },
] as const;

type TabValue = (typeof tabs)[number]['value'];

export const MyNotices = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<TabValue>('favorites');

  const allPets = useSelector((state: RootState) => state.pets.items, shallowEqual);
  const favoritesIds = useSelector((state: RootState) => state.auth.user?.noticesFavorites || [], shallowEqual);
  const viewedIds = useSelector((state: RootState) => state.auth.user?.noticesViewed || [], shallowEqual);

  const handleDeleteFavorite = (id: string) => {
    dispatch(deleteFavoriteFromBackend(id));
  };

  const list = useMemo(() => {
    const ids = activeTab === 'favorites' ? favoritesIds : viewedIds;
    return allPets.filter(pet => ids.includes(pet._id));
  }, [activeTab, favoritesIds, viewedIds, allPets]);

  return (
    <div className={s.myNotices}>
      <div className={s.tabs}>
        {tabs.map(tab => (
          <button
            type="button"
            key={tab.value}
            className={clsx(s.tab, activeTab === tab.value && s.active)}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {list.length > 0 ? (
        list.map((notice: Pet) => (
          <NoticesItem
            key={notice._id}
            notice={notice}
            showDeleteIcon={activeTab === 'favorites'}
            onDelete={() => handleDeleteFavorite(notice._id)}
          />
        ))
      ) : (
        <div className={s.empty}>
          {activeTab === 'favorites' ? (
            <p className={s.favorites}>
              Oops, <span className={s.highlight}>looks like there aren't any furries</span> on our adorable page yet.
              Do not worry! View your pets on the "find your favorite pet" page and add them to your favorites.
            </p>
          ) : (
            <p className={s.viewed}>You haven't viewed any pets yet.</p>
          )}
        </div>
      )}
    </div>
  );
};