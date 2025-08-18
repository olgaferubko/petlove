import { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { deleteFavoriteFromBackend, fetchCurrentUser } from '../../redux/auth/operations';
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

 const user = useSelector((state: RootState) => state.auth.user);

  
  const allPets = useSelector((state: RootState) => state.pets.items, shallowEqual);

  const handleDeleteFavorite = (id: string) => {
    dispatch(deleteFavoriteFromBackend(id));
  };

  const favorites = user?.noticesFavorites || [];

  const viewed = useSelector(
    (state: RootState) => state.auth.user?.noticesViewed || []
  );

  const list = useMemo(() => {
    if (activeTab === 'favorites') return favorites;
    return allPets.filter(pet => viewed.includes(pet._id));
  }, [activeTab, favorites, viewed, allPets]);

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
          <ul className={s.list}>
              {list.map(notice => (
                <NoticesItem
                  key={notice._id}
                  notice={notice}
                  showDeleteIcon={activeTab === 'favorites'}
                  onDelete={() => handleDeleteFavorite(notice._id)}
                />
              ))}
            </ul>
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