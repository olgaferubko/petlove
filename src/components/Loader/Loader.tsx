import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import s from './Loader.module.css';

const Loader: FC = () => {
  const isRefreshing = useSelector(selectIsRefreshing);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isRefreshing) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isRefreshing]);

  if (!visible) return null;

  return (
    <div className={`${s.overlay} ${!isRefreshing ? s.fadeOut : ''}`}>
      <div className={s.content}>
        <h1 className={s.logo}>
          petl
          <svg className={s.heartIcon} aria-hidden="true" focusable="false">
            <use href="/icons.svg#icon-heart-circle" />
          </svg>
          ve
        </h1>
        <div className={s.spinner}></div>
      </div>
    </div>
  );
};

export default Loader;