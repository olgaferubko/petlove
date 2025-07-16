import { useEffect } from 'react';
import s from './ModalApproveAction.module.css';

interface ModalApproveActionProps {
  onConfirm: () => void;
  onCancel: () => void;
  errorMessage?: string;
}

const ICONS_SPRITE = '/icons.svg';

const ModalApproveAction: React.FC<ModalApproveActionProps> = ({ onConfirm, onCancel, errorMessage }) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onCancel]);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className={s.backdrop} onClick={onBackdropClick}>
      <div className={s.modal}>
        <button
          type="button"
          className={s.closeBtn}
          onClick={onCancel}
          aria-label="Close modal"
        >
          <svg
            className={s.closeBtn}
            width={24}
            height={24}
            aria-hidden="true"
            focusable="false"
          >
            <use href={`${ICONS_SPRITE}#icon-x`} />
          </svg>
        </button>

        <div className={s.imageWrapper}>   
            <img
            src="./images/cat.png"
            width="44" height="44" alt="Cat"
            /> 
        </div>            
        <p className={s.text}>Already leaving?</p>
        {errorMessage && <p className={s.error}>{errorMessage}</p>}
        <div className={s.buttons}>
          <button className={s.yesBtn} onClick={onConfirm}>Yes</button>
          <button className={s.cancelBtn} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ModalApproveAction;