export interface TitleProps {
  text: string;
  subtitle?: string;
}

const Title: React.FC<TitleProps> = ({ text, subtitle }) => (
  <header>
    <h1>{text}</h1>
    {subtitle && <p>{subtitle}</p>}
  </header>
);

export default Title;