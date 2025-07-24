import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ModalAttention from '../ModalAttention/ModalAttention';
import ModalNotice from '../ModalNotice/ModalNotice';
import useAuth from '../../hooks/useAuth';
import { toggleFavorite } from '../../redux/pets/slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import s from './NoticesItem.module.css';

interface NoticesItemProps {
  notice: {
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
  };
}

const formatWord = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const NoticesItem: React.FC<NoticesItemProps> = ({ notice }) => {
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [showAttentionModal, setShowAttentionModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);

  const {
    imgURL,
    title,
    popularity,
    name,
    birthday,
    sex,
    species,
    category,
    comment,
    price,
    isFavorite,
  } = notice;

  const handleToggleFavorite = () => {
    if (!isLoggedIn) {
      setShowAttentionModal(true);
      return;
    }
    dispatch(toggleFavorite(notice._id));
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
      <li className={s.card}>
        <img src={imgURL} alt={title} className={s.image} />
        <div className={s.content}>
          <div>
            <div className={s.titleWrapper}>
              <h3 className={s.title}>{title}</h3>
              <p className={s.popularity}>{popularity}</p>
            </div>
            <ul className={s.infoList}>
              <li className={s.infoItem}>
                <span className={s.decor}>Name:</span> {formatWord(name)}
              </li>
              <li className={s.infoItem}>
                <span className={s.decor}>Birthday:</span> {formatDate(birthday)}
              </li>
              <li className={s.infoItem}>
                <span className={s.decor}>Sex:</span> {formatWord(sex)}
              </li>
              <li className={s.infoItem}>
                <span className={s.decor}>Species:</span> {formatWord(species)}
              </li>
              <li className={s.infoItem}>
                <span className={s.decor}>Category:</span> {formatWord(category)}
              </li>
            </ul>
            <p className={s.comment}>{comment}</p>
          </div>
          <div className={s.priceWrapper}>
            <p className={s.price}>{price ? `$${price}` : 'Free'}</p>
            <div className={s.btnWrapper}>
              <button className={s.learnMoreBtn} onClick={handleLearnMoreClick}>Learn more</button>
              <button
                className={s.heartBtn}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                onClick={handleToggleFavorite}
              >
                <svg className={`${s.iconHeart} ${isFavorite ? s.favorited : ''}`} width={24} height={24}>
                  <use href="/icons.svg#icon-heart" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </li>

      {showAttentionModal && <ModalAttention onClose={() => setShowAttentionModal(false)} />}
      {showNoticeModal && (
        <ModalNotice
          notice={notice}
          onClose={() => setShowNoticeModal(false)}
          user={user}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </>
  );
};

export default NoticesItem;