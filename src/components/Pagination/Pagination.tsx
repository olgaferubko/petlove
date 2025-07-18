import { useState, useEffect } from 'react';
import s from './Pagination.module.css';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (totalPages <= 1) return null;

  const DOTS = '...';
  const count = isMobile ? 2 : 3;

  const range = (start: number, end: number): number[] =>
    end < start ? [] : Array.from({ length: end - start + 1 }, (_, i) => start + i);

  let pages: (number | string)[];
  {
    const end = Math.min(currentPage + count - 1, totalPages);
    const start = Math.max(currentPage, 1);
    pages = range(start, end);
    if (end < totalPages) {
      pages.push(DOTS);
    }
  }

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
      <nav className={s.pagination}>
          <div className={s.btnWrapper}>
            <button
                className={s.arrowBtn}
                onClick={() => handleClick(1)}
                disabled={currentPage === 1}
            >
                <svg 
                className={`${s.iconArrow} ${
                    currentPage === 1 ? s.disabledIcon : ''
                }`}
                width={25}
                height={25}
                >
                    <use href="/icons.svg#icon-arrows" />
                </svg>
            </button>

            <button
                className={s.arrowBtn}
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <svg 
                className={`${s.iconArrow} ${
                    currentPage === 1 ? s.disabledIcon : ''
                }`}
                width={20}
                height={20}
                >
                    <use href="/icons.svg#icon-arrow" />
                </svg>
            </button>
        </div>
          
        <div className={s.pagesWrapper}>
        {pages.map((p, idx) =>
            p === DOTS ? (
            <span key={idx} className={s.dots}>{DOTS}</span>
            ) : (
            <button
                key={idx}
                className={`${s.pageBtn} ${p === currentPage ? s.active : ''}`}
                onClick={() => handleClick(p as number)}
            >
                {p}
            </button>
            )
        )}
        </div>
          
        <div className={s.btnWrapper}>
        <button
            className={s.arrowBtn}
            onClick={() => handleClick(currentPage + 1)}
            disabled={currentPage === totalPages}
        >
            <svg 
            className={`${s.iconArrowRight} ${
                currentPage === totalPages ? s.disabledIcon : ''
            }`}
            width={20}
            height={20}
            >
                <use href="/icons.svg#icon-arrow" />
            </svg>
        </button>

        <button
            className={s.arrowBtn}
            onClick={() => handleClick(totalPages)}
            disabled={currentPage === totalPages}
        >
            <svg 
            className={`${s.iconArrowRight} ${
                currentPage === totalPages ? s.disabledIcon : ''
            }`}
            width={25}
            height={25}
            >
                <use href="/icons.svg#icon-arrows" />
            </svg>
          </button>
        </div>
    </nav>
  );
};

export default Pagination;