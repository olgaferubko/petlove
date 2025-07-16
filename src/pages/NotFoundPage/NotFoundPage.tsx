import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import s from './NotFoundPage.module.css';


const NotFoundPage: React.FC = () => {
  return (
    <main className={s.container}>
      <Header />
      <div className={s.wrapper}>
        <div className={s.code}>
          <span>4</span>
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet="/images/404.png 1x, /images/404-tablet@2x.png 2x"
            />
            <img
              src="/images/404.png"
              srcSet="/images/404.png 1x, /images/404@2x.png 2x"
              alt="Cute cat"
            />
          </picture>
          <span>4</span>
        </div>
        <p className={s.text}>Ooops! This page not found :(</p>
        <Link to="/home" className={s.home}>
          To home page
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;