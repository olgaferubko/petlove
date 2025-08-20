import { PropagateLoader } from 'react-spinners';
import s from './BaseLoader.module.css';

const BaseLoader = () => {
  return (
    <div className={s.backdrop}>
      <PropagateLoader color="#f6b83d" size={15} />
    </div>
  );
};

export default BaseLoader;