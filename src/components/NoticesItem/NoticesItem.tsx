import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalAttention from '../ModalAttention/ModalAttention';
import ModalNotice from '../ModalNotice/ModalNotice';
import { shallowEqual } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { addFavoriteToBackend, deleteFavoriteFromBackend } from '../../redux/pets/operations';
import { AppDispatch, RootState } from '../../redux/store';
import { Pet } from '../../redux/pets/pets-types';
import s from './NoticesItem.module.css';

interface NoticesItemProps {
  notice: Pet;
  showDeleteIcon?: boolean;
  onDelete?: () => void;
}

const formatWord = (word?: string) =>
  word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : '';

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
};

const NoticesItem: React.FC<NoticesItemProps> = ({ notice, showDeleteIcon, onDelete }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useAuth();

const favorites = useSelector(
  (state: RootState) => state.auth.user?.noticesFavorites || [],
  shallowEqual
);

const isFavorite = useMemo(
  () => favorites.includes(notice._id),
  [favorites, notice._id]
);

  const [showAttentionModal, setShowAttentionModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);

  const handleToggleFavorite = () => {
    if (!isLoggedIn) {
      setShowAttentionModal(true);
      return;
    }

    if (isFavorite) {
      dispatch(deleteFavoriteFromBackend(notice._id));
    } else {
      dispatch(addFavoriteToBackend(notice._id));
    }
  };

  const handleDelete = () => {
    if (!isLoggedIn) {
      setShowAttentionModal(true);
      return;
    }
    onDelete?.();
  };

  const handleLearnMoreClick = () => {
    if (!isLoggedIn) {
      setShowAttentionModal(true);
      return;
    }
    setShowNoticeModal(true);
  };

  return (
    <>
      <div className={s.card}>
        <img src={notice.imgURL} alt={notice.title} className={s.image} />
        <div className={s.content}>
          <div>
            <div className={s.titleWrapper}>
              <h3 className={s.title}>{notice.title}</h3>
              <p className={s.popularity}>
                <svg className={s.iconStar} width={16} height={16}>
                    <use href="/icons.svg#icon-star" />
                  </svg>{notice.popularity}</p>
            </div>

            <ul className={s.infoList}>
              <li className={s.infoItem}><span className={s.decor}>Name:</span> {formatWord(notice.name)}</li>
              <li className={s.infoItem}><span className={s.decor}>Birthday:</span> {formatDate(notice.birthday)}</li>
              <li className={s.infoItem}><span className={s.decor}>Sex:</span> {formatWord(notice.sex)}</li>
              <li className={s.infoItem}><span className={s.decor}>Species:</span> {formatWord(notice.species)}</li>
              <li className={s.infoItem}><span className={s.decor}>Category:</span> {formatWord(notice.category)}</li>
            </ul>

            <p className={s.comment}>{notice.comment}</p>
          </div>

          <div className={s.priceWrapper}>
            <p className={s.price}>{notice.price ? `$${notice.price}` : 'Free'}</p>
            <div className={s.btnWrapper}>
              <button type="button" className={s.learnMoreBtn} onClick={handleLearnMoreClick}>
                Learn more
              </button>

              {showDeleteIcon ? (
                <button type="button" className={s.trashBtn} aria-label="Delete" onClick={handleDelete}>
                  <svg className={s.iconTrash} width={18} height={18}>
                    <use href="/icons.svg#icon-trash" />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  className={s.heartBtn}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  onClick={handleToggleFavorite}
                >
                  <svg className={`${s.iconHeart} ${isFavorite ? s.favorited : ''}`} width={24} height={24}>
                    <use href="/icons.svg#icon-heart" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showAttentionModal && <ModalAttention onClose={() => setShowAttentionModal(false)} />}
      {showNoticeModal && (
        <ModalNotice
          notice={notice}
          onClose={() => setShowNoticeModal(false)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </>
  );
};

export default NoticesItem;