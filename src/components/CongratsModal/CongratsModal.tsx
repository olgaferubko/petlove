import { useEffect } from 'react';
import s from './CongratsModal.module.css';

interface CongratsModalProps {
  onClose: () => void;
}

const CongratsModal: React.FC<CongratsModalProps> = ({ onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.modal}>
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

        <div className={s.imageWrapper}>
          <img
            src="./images/cat.png"
            width="44"
            height="44"
            alt="Cat"
          />
        </div>

        <div className={s.textWrapper}>
          <h3 className={s.heading}>Congrats</h3>
          <p className={s.messageText}>
            The first fluff in the favorites! May your friendship be the happiest and filled with fun.
          </p>
        </div>

        <a href="/profile" className={s.profileBtn}>
          Go to profile
        </a>
      </div>
    </div>
  );
};

export default CongratsModal;