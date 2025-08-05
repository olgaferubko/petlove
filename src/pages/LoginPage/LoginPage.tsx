import { Link } from 'react-router-dom';
import PetBlock from '../../components/PetBlock/PetBlock';
import Title from '../../components/Title/Title';
import LoginForm from '../../components/LoginForm/LoginForm';
import Header from "../../components/Header/Header";
import s from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  return (
    <main className={s.container}>
      <Header />
      <div className={s.loginWrapper}>
        <div className={s.petBlockWrapper}>
          <PetBlock
            desktop1x="/images/login-desktop.jpg"
            desktop2x="/images/login-desktop@2x.jpg"
            tablet1x="/images/login-tablet.jpg"
            tablet2x="/images/login-tablet@2x.jpg"
            mobile1x="/images/login-mobile.jpg"
            mobile2x="/images/login-mobile@2x.jpg"
            alt="Join PetLove — your pet's new best friend"
          />
          <div className={s.decoration}>
            <div className={s.imageWrapper}>   
              <img
              className={s.dog}
              src="./images/dog.png"
              width="44" height="44" alt="Dog"
              /> 
            </div>
            <div className={s.rightBlock}>
              <div className={s.titleWrapper}>
                <h3 className={s.title}>Rich</h3>
                <p className={s.birthday}><span className={s.decor}>Birthday:</span>21.09.2020</p>
              </div>
              <p className={s.text}>Rich would be the perfect addition to an active family that loves to play and go on walks. I bet he would love having a doggy playmate too!</p>
            </div>
          </div>  
        </div>
  
        <section className={s.loginForm}>
          <Title
            text="Log in"
            subtitle="Welcome! Please enter your credentials to login to the platform:"
          />
          <LoginForm />

          <p className={s.account}>
            Don't have an account?{' '}
            <Link to="/register" className={s.register}>
              Register
            </Link>
          </p>
          </section>
      </div>
    </main>
  );
};

export default LoginPage;