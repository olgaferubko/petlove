import { useEffect } from 'react';
import AuthNav from '../AuthNav/AuthNav';
import s from './ModalAttention.module.css';

interface ModalAttentionProps {
  onClose: () => void;
}

const ModalAttention: React.FC<ModalAttentionProps> = ({ onClose }) => {
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
            src="./images/dog.png"
            width="44" height="44" alt="Dog"
            /> 
        </div> 
        <div className={s.textWrapper}>
          <h3 className={s.heading}>Attention</h3>
          <p className={s.warningText}>
            We would like to remind you that certain functionality is available only to authorized users. If you have an account, please log in with your credentials. If you do not already have an account, you must register to access these features.
          </p>
        </div>
          <AuthNav onLinkClick={onClose} isModal={true} />
      </div>
    </div>
  );
};

export default ModalAttention;