import s from './PetsItem.module.css';

interface Pet {
  _id: string;
  title: string;
  name: string;
  birthday: string;
  sex: string;
  species: string;
  imgURL?: string;
}

interface Props {
  pet: Pet;
  onDelete: (id: string) => void;
}

const PetsItem = ({ pet, onDelete }: Props) => {

  function formatDate(dateStr: string): string {
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;
  }

  return (
    <li className={s.card}>
      <div className={s.imageWrapper}>
        <img src={pet.imgURL || '/default-pet.jpg'} alt={pet.name} className={s.image} />
      </div>
      
      <div className={s.meta}>
        <h4 className={s.title}>{pet.title}</h4>
          <div className={s.wrapperList}>
            <p className={s.item}><span className={s.decor}>Name</span>{pet.name}</p>
            <p className={s.item}><span className={s.decor}>Birthday</span>{formatDate(pet.birthday)}</p>
            <p className={s.item}>
              <span className={s.decor}>Sex</span>
              {pet.sex.charAt(0).toUpperCase() + pet.sex.slice(1)}
            </p>
            <p className={s.item}>
              <span className={s.decor}>Species</span>
              {pet.species.charAt(0).toUpperCase() + pet.species.slice(1)}
            </p>
          </div>
      </div>

      <button className={s.trashBtn} onClick={() => onDelete(pet._id)}>
        <svg className={s.iconTrash} width={16} height={16}>
          <use href="/icons.svg#icon-trash" />
        </svg>
      </button>
    </li>
  );
};

export default PetsItem;