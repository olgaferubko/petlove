import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import PetBlock from '../../components/PetBlock/PetBlock';
import Title from '../../components/Title/Title';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import s from '../LoginPage/LoginPage.module.css';

const RegisterPage: React.FC = () => {
  return (
    <main className={s.container}>
      <Header />
      <PetBlock
        desktop1x="/images/register-desktop.jpg"
        desktop2x="/images/register-desktop@2x.jpg"
        tablet1x="/images/register-tablet.jpg"
        tablet2x="/images/register-tablet@2x.jpg"
        mobile1x="/images/register-mobile.jpg"
        mobile2x="/images/register-mobile@2x.jpg"
        alt="Join PetLove — your pet's new best friend"
      />

      <section className={s.loginForm}>
        <Title
          text="Registration"
          subtitle="Thank you for your interest in our platform."
        />

        <RegisterForm />

        <p className={s.account}>
          Already have an account?{' '}
          <Link to="/login" className={s.register}>
            Login
          </Link>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;