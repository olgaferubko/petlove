import Header from '../../components/Header/Header';
import s from './HomePage.module.css';


const HomePage: React.FC = () => {
  return (
    <main className={s.container}>
      <div className={s.wrapperBg}>
        <Header />
        <div className={s.blockWrapper}>
          <h1 className={s.heading}>Take good <span className={s.decor}>care</span> of your small pets</h1>
          <div className={s.textWrapper}>
            <p className={s.text}>Choosing a pet for your home is a choice that is meant to enrich your life with immeasurable joy and tenderness.</p>
          </div>
        </div>
      </div>
          <picture>
              <source
                media="(min-width: 1280px)"
                srcSet="/images/home-desktop.jpg 1x, /images/home-desktop@2x.jpg 2x"
              />
              <source
                media="(min-width: 768px)"
                srcSet="/images/home-tablet.jpg 1x, /images/home-tablet@2x.jpg 2x"
              />
              <img
                className={s.image}
                src="/images/home-mobile.jpg"
                srcSet="/images/home-mobile.jpg 1x, /images/home-mobile@2x.jpg 2x"
                alt="Cute cat"
              />
          </picture>
    </main>
  );
};

export default HomePage;