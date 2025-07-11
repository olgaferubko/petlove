import { Link } from 'react-router-dom';
import PetBlock from '../../components/PetBlock/PetBlock';
import Title from '../../components/Title/Title';
import LoginForm from '../../components/LoginForm/LoginForm';
import Header from "../../components/Header/Header";
import s from './LoginPage.module.css'

const LoginPage: React.FC = () => {
  return (
    <main className={s.container}>
      <Header />
      <PetBlock
        desktop1x="/images/login-desktop.jpg"
        desktop2x="/images/login-desktop@2x.jpg"
        tablet1x="/images/login-tablet.jpg"
        tablet2x="/images/login-tablet@2x.jpg"
        mobile1x="/images/login-mobile.jpg"
        mobile2x="/images/login-mobile@2x.jpg"
        alt="Join PetLove — your pet's new best friend"
      />
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
    </main>
  );
};

export default LoginPage;