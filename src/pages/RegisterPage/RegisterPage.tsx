import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import PetBlock from '../../components/PetBlock/PetBlock';
import Title from '../../components/Title/Title';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <main>
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

      <section>
        <Title
          text="Registration"
          subtitle="Thank you for your interest in our platform."
        />

        <RegisterForm />

        <p>
          Already have an account?{' '}
          <Link to="/login">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;