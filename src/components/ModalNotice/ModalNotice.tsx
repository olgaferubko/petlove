import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { addViewed } from '../../redux/viewed/slice';
import { Pet } from '../../redux/pets/pets-types';
import s from './ModalNotice.module.css';

type ModalNoticeProps = {
  notice: Pet;
  onClose: () => void;
  onToggleFavorite: () => void;
};

const ModalNotice: FC<ModalNoticeProps> = ({ notice, onClose, onToggleFavorite }) => {
  const {
    _id,
    title,
    name,
    birthday,
    comment,
    sex,
    species,
    category,
    price,
    imgURL,
    popularity,
  } = notice;

  const favorites = useSelector((state: RootState) => state.auth.user?.noticesFavorites || []);
  const isFavorite = favorites.some(fav =>
    typeof fav === 'string' ? fav === _id : fav._id === _id
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(addViewed(notice));
  }, [dispatch, notice._id]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [onClose]);

  const formatWord = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const formatPrice = (value?: string) => {
    const parsed = Number(value);
    return !isNaN(parsed) ? `$${parsed.toFixed(2)}` : 'Free';
  };

  return (
    <div className={s.backdrop} onClick={(e) => e.currentTarget === e.target && onClose()}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={s.closeBtn} onClick={onClose} aria-label="Close modal">
          <svg className={s.closeIcon} width={24} height={24}>
            <use href="/icons.svg#icon-x" />
          </svg>
        </button>

        <img src={imgURL} alt={title} className={s.image} />
        <span className={s.category}>{formatWord(category)}</span>
        <h3 className={s.title}>{title}</h3>

        <div className={s.rating}>
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              className={`${s.star} ${i < popularity ? s.active : ''}`}
              width={16}
              height={16}
            >
              <use href="/icons.svg#icon-star" />
            </svg>
          ))}
          <span>{popularity}</span>
        </div>

        <ul className={s.detailsList}>
          <li className={s.detailsItem}><span className={s.decor}>Name:</span> {formatWord(name)}</li>
          <li className={s.detailsItem}><span className={s.decor}>Birthday:</span> {formatDate(birthday)}</li>
          <li className={s.detailsItem}><span className={s.decor}>Sex:</span> {formatWord(sex)}</li>
          <li className={s.detailsItem}><span className={s.decor}>Species:</span> {formatWord(species)}</li>
        </ul>

        <p className={s.comment}>{comment}</p>
        <p className={s.price}>{formatPrice(price)}</p>

        <div className={s.buttons}>
          <button type="button" className={s.favBtn} onClick={onToggleFavorite}>
            {isFavorite ? 'Remove from' : 'Add to'}{' '}
            <svg width={18} height={18} className={s.heartIcon}>
              <use href="/icons.svg#icon-heart" />
            </svg>
          </button>

          <a
            href="mailto:petlove@gmail.com?subject=Contact about pet notice"
            className={s.contactBtn}
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

export default ModalNotice;