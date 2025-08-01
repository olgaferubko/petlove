import { Link } from 'react-router-dom';
import s from './AddPet.module.css';

const AddPet = () => {
  return (
    <div className={s.wrapper}>
      <h3 className={s.title}>My pets</h3>
      <Link to="/add-pet" className={s.btn}>
        Add pet
        <svg className={s.icon} width={18} height={18} aria-hidden="true">
          <use href="/icons.svg#icon-plus" />
        </svg>
      </Link>
    </div>
  );
};

export default AddPet;