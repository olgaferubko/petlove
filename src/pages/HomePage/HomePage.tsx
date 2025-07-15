import Header from '../../components/Header/Header';
import s from './HomePage.module.css';


const HomePage: React.FC = () => {
  return (
    <main className={s.container}>
      <Header />
    </main>
  );
};

export default HomePage;