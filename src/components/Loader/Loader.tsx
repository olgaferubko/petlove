import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import s from './Loader.module.css';

const Loader: FC = () => {
  const isRefreshing = useSelector(selectIsRefreshing);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRefreshing) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          return prev + 1;
        });
      }, 50);
    } else {
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRefreshing]);

  if (!isRefreshing && progress === 0) return null;

  return (
    <div className={s.overlay}>
      <div className={s.content}>
        {progress < 15 ? (
          <h1 className={s.logo}>
            petl
            <svg
              className={s.heartIcon}
              aria-hidden="true"
              focusable="false"
            >
              <use href="/icons.svg#icon-heart-circle" />
            </svg>
            ve
          </h1>
        ) : (
          <div className={s.progressCircle}>
            <span>{progress}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loader;