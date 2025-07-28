import PetBlock from '../../components/PetBlock/PetBlock';
import AddPetForm from '../../components/AddPetForm/AddPetForm';
import Header from '../../components/Header/Header';
import s from './AddPage.module.css';

const AddPage: React.FC = () => {
  return (
    <main className={s.container}>
      <Header />
      <PetBlock
        desktop1x="/images/add-desktop.jpg"
        desktop2x="/images/add-desktop@2x.jpg"
        tablet1x="/images/add-tablet.jpg"
        tablet2x="/images/add-tablet@2x.jpg"
        mobile1x="/images/add-mobile.jpg"
        mobile2x="/images/add-mobile@2x.jpg"
        alt="Join PetLove — your pet's new best friend"
      />
      <section className={s.addForm}>
        <AddPetForm />
      </section>
    </main>
  );
};


export default AddPage;