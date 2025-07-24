import { FC, useEffect, useState } from 'react';
import s from './ModalNotice.module.css';

type Notice = {
  _id: string;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: string;
  species: string;
  category: string;
  price?: string;
  imgURL: string;
  popularity: number;
  isFavorite: boolean;
};

type ModalNoticeProps = {
  notice: Notice;
  onClose: () => void;
  user?: { email?: string; phone?: string } | null;
  onToggleFavorite: () => void;
};

const ModalNotice: FC<ModalNoticeProps> = ({ notice, onClose, user, onToggleFavorite }) => {
  const {
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
    isFavorite,
  } = notice;

  const [fav, setFav] = useState(isFavorite);

    useEffect(() => {
        setFav(isFavorite);
    }, [isFavorite]);
    
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [onClose]);

    const toggleFavorite = () => {
    setFav((prev) => !prev);
    onToggleFavorite?.();
    };

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

    const formatPrice = (value?: string) => {
        const parsed = Number(value);
        return !isNaN(parsed) ? `$${parsed.toFixed(2)}` : 'Free';
    };

  return (
    <div className={s.backdrop} onClick={(e) => e.currentTarget === e.target && onClose()}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={s.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            className={s.closeBtn}
            width={24}
            height={24}
            aria-hidden="true"
            focusable="false"
          >
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
          <li className={s.detailsItem}><span className={s.decor}>Name:</span>{formatWord(name)}</li>
          <li className={s.detailsItem}><span className={s.decor}>Birthday:</span> {formatDate(birthday)}</li>
          <li className={s.detailsItem}><span className={s.decor}>Sex:</span>{formatWord(sex)}</li>
          <li className={s.detailsItem}><span className={s.decor}>Species:</span>{formatWord(species)}</li>
        </ul>

        <p className={s.comment}>{comment}</p>
        <p className={s.price}>{formatPrice(price)}</p>

        <div className={s.buttons}>
          <button className={s.favBtn} onClick={toggleFavorite}>
            {fav ? 'Remove from' : 'Add to'}{' '}
            <svg width={18} height={18} className={s.heartIcon}>
              <use href="/icons.svg#icon-heart" />
            </svg>
          </button>

          {user?.email && (
            <a href={`mailto:${user.email}`}>
              <button className={s.contactBtn}>Contact</button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalNotice;