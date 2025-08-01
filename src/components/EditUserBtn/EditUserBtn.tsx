import s from './EditUserBtn.module.css';

interface EditUserBtnProps {
  onClick: () => void;
}

const EditUserBtn = ({ onClick }: EditUserBtnProps) => {
  return (
    <button className={s.editBtn} onClick={onClick} aria-label="Edit user">
      <svg className={s.iconEdit} width={18} height={18}>
        <use href="/icons.svg#icon-edit" />
      </svg>
    </button>
  );
};

export default EditUserBtn;
