import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import PetBlock from '../../components/PetBlock/PetBlock';
import Title from '../../components/Title/Title';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import s from './RegisterPage.module.css';

const RegisterPage: React.FC = () => {
  return (
    <main className={s.container}>
      <Header />
      <div className={s.loginWrapper}>
        <div className={s.petBlockWrapper}>
          <PetBlock
            desktop1x="/images/register-desktop.jpg"
            desktop2x="/images/register-desktop@2x.jpg"
            tablet1x="/images/register-tablet.jpg"
            tablet2x="/images/register-tablet@2x.jpg"
            mobile1x="/images/register-mobile.jpg"
            mobile2x="/images/register-mobile@2x.jpg"
            alt="Join PetLove — your pet's new best friend"
          />
          <div className={s.decoration}>
            <div className={s.imageWrapper}>   
              <img
              className={s.dog}
              src="./images/cat.png"
              width="44" height="44" alt="Cat"
              /> 
            </div>
            <div className={s.rightBlock}>
              <div className={s.titleWrapper}>
                <h3 className={s.title}>Jack</h3>
                <p className={s.birthday}><span className={s.decor}>Birthday:</span>18.10.2021</p>
              </div>
              <p className={s.text}>Jack is a gray Persian cat with green eyes. He loves to be pampered and groomed, and enjoys playing with toys.</p>
            </div>
          </div>  
        </div>
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
      </div>
    </main>
  );
};

export default RegisterPage;