import s from './Title.module.css'

export interface TitleProps {
  text: string;
  subtitle?: string;
}

const Title: React.FC<TitleProps> = ({ text, subtitle }) => (
  <section className={s.container}>
    <h2 className={s.title}>{text}</h2>
    {subtitle && <p className={s.subtitle}>{subtitle}</p>}
  </section>
);

export default Title;